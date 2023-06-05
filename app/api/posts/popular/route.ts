import { mongooseConnect } from "@/app/lib/mongoose";
import Post from "@/app/models/Post";
import { NextResponse } from "next/server";
import Category from "@/app/models/Category";
import User from "@/app/models/User";
import Comment from "@/app/models/Comment";

export async function GET() {
  await mongooseConnect();

  try {
    const posts = await Post.find({})
      .populate([
        {
          path: "user",
          model: User,
        },
        {
          path: "category",
          model: Category,
          populate: {
            path: "parent",
            model: "Category",
          },
        },
        {
          path: "comments",
          model: Comment,
        },
      ])
      .sort({ views: "desc" });
    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
