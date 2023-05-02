import { mongooseConnect } from "@/app/lib/mongoose";
import Category from "@/app/models/Category";
import Post from "@/app/models/Post";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("category");

  const post = await Post.find({
    $or: [{ slug: slug }],
  }).populate([
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
  ]);

  return NextResponse.json(post);
}
