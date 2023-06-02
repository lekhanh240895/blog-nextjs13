import { mongooseConnect } from "@/app/lib/mongoose";
import Post from "@/app/models/Post";
import { NextResponse } from "next/server";

export async function GET() {
  await mongooseConnect();

  try {
    const posts = await Post.find({}).sort({ views: "desc" });

    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
