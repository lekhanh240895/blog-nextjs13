import Category from "@/app/models/Category";
import Post from "@/app/models/Post";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = Object.fromEntries(searchParams.entries());

  const conditions = Object.entries(query).map(([key, value]) => ({
    [key]: value,
  }));

  const post = await Post.find({
    $or: conditions,
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
