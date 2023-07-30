import { mongooseConnect } from "@/app/lib/mongoose";
import Post from "@/app/models/Post";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";

  const posts = await Post.find({
    title: {
      $regex: new RegExp(query.normalize("NFC"), "i"),
    },
  }).sort({
    createdAt: "desc",
  });

  return NextResponse.json(posts);
}
