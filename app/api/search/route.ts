import { mongooseConnect } from "@/app/lib/mongoose";
import Category from "@/app/models/Category";
import Post from "@/app/models/Post";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  const tab = searchParams.get("tab");
  const page = searchParams.get("page");
  const numberPerPage = parseInt(searchParams.get("perPage") || "5");

  if (!query) {
    return NextResponse.json(null);
  }

  if (tab) {
    switch (tab) {
      case "popularPosts":
        let popularPosts;

        if (page) {
          popularPosts = await Post.find({
            title: {
              $regex: new RegExp(query.normalize("NFC"), "i"),
            },
          })
            .sort({
              views: "desc",
            })
            .skip((parseInt(page, 10) - 1) * numberPerPage)
            .limit(numberPerPage);
        } else {
          popularPosts = await Post.find({
            title: {
              $regex: new RegExp(query.normalize("NFC"), "i"),
            },
          }).sort({
            views: "desc",
          });
        }

        return NextResponse.json({ popularPosts });
      case "posts":
        let posts;

        if (page) {
          posts = await Post.find({
            title: {
              $regex: new RegExp(query.normalize("NFC"), "i"),
            },
          })
            .sort({
              createdAt: "desc",
            })
            .skip((parseInt(page, 10) - 1) * numberPerPage)
            .limit(numberPerPage);
        } else {
          posts = await Post.find({
            title: {
              $regex: new RegExp(query.normalize("NFC"), "i"),
            },
          }).sort({
            createdAt: "desc",
          });
        }

        return NextResponse.json({ posts });
      case "authors":
        let users;

        if (page) {
          users = await User.find({
            name: {
              $regex: new RegExp(query.normalize("NFC"), "i"),
            },
          })
            .skip((parseInt(page, 10) - 1) * numberPerPage)
            .limit(numberPerPage);
        } else {
          users = await User.find({
            name: {
              $regex: new RegExp(query.normalize("NFC"), "i"),
            },
          });
        }

        return NextResponse.json({ users });
      case "categories":
        let categories;

        if (page) {
          categories = await Category.find({
            title: {
              $regex: new RegExp(query.normalize("NFC"), "i"),
            },
          })
            .skip((parseInt(page, 10) - 1) * numberPerPage)
            .limit(numberPerPage);
        } else {
          categories = await Category.find({
            title: {
              $regex: new RegExp(query.normalize("NFC"), "i"),
            },
          });
        }

        return NextResponse.json({ categories });
      default:
        return;
    }
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
