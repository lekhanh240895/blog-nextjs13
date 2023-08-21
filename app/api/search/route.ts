import { mongooseConnect } from "@/app/lib/mongoose";
import Category from "@/app/models/Category";
import Comment from "@/app/models/Comment";
import Post from "@/app/models/Post";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  const page = searchParams.get("page");
  const numberPerPage = parseInt(searchParams.get("perPage") || "5");

  if (!query) {
    return NextResponse.json(null);
  }

  if (page) {
    const posts = await Post.find({
      title: {
        $regex: new RegExp(query.normalize("NFC"), "i"),
      },
    })
      .sort({
        createdAt: "desc",
      })
      .skip((parseInt(page, 10) - 1) * numberPerPage)
      .limit(numberPerPage);

    const popularPosts = await Post.find({
      title: {
        $regex: new RegExp(query.normalize("NFC"), "i"),
      },
    })
      .sort({
        views: "desc",
      })
      .skip((parseInt(page, 10) - 1) * numberPerPage)
      .limit(numberPerPage);

    const users = await User.find({
      name: {
        $regex: new RegExp(query.normalize("NFC"), "i"),
      },
    })
      .skip((parseInt(page, 10) - 1) * numberPerPage)
      .limit(numberPerPage);

    const categories = await Category.find({
      title: {
        $regex: new RegExp(query.normalize("NFC"), "i"),
      },
    })
      .skip((parseInt(page, 10) - 1) * numberPerPage)
      .limit(numberPerPage);

    return NextResponse.json({ popularPosts, posts, users, categories });
  }

  const popularPosts = await Post.find({
    title: {
      $regex: new RegExp(query.normalize("NFC"), "i"),
    },
  }).sort({
    views: "desc",
  });

  const posts = await Post.find({
    title: {
      $regex: new RegExp(query.normalize("NFC"), "i"),
    },
  }).sort({
    createdAt: "desc",
  });

  const users = await User.find({
    name: {
      $regex: new RegExp(query.normalize("NFC"), "i"),
    },
  });

  const categories = await Category.find({
    title: {
      $regex: new RegExp(query.normalize("NFC"), "i"),
    },
  });

  return NextResponse.json({ popularPosts, posts, users, categories });
}
