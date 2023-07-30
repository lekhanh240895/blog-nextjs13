import { mongooseConnect } from "@/app/lib/mongoose";
import Category from "@/app/models/Category";
import Post from "@/app/models/Post";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(null);
  }

  const posts = await Post.find({
    title: {
      $regex: new RegExp(query.normalize("NFC"), "i"),
    },
  }).sort({
    createdAt: "desc",
  });

  const popularPosts = await Post.find({
    title: {
      $regex: new RegExp(query.normalize("NFC"), "i"),
    },
  })
    .sort({
      views: "desc",
    })
    .limit(5);

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
