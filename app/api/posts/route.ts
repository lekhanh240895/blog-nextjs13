import { mongooseConnect } from "@/app/lib/mongoose";
import Post from "@/app/models/Post";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const post = await Post.findById(id).populate({
      path: "user",
      model: User,
    });

    return NextResponse.json(post);
  }

  const posts = await Post.find({}).populate({
    path: "user",
    model: User,
  });

  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  await mongooseConnect();

  const request = await req.json();

  const { title, description, content, user, mainImage, slug } = request;

  const newPost = await Post.create({
    title,
    description,
    content,
    user,
    mainImage,
    slug,
  });

  return NextResponse.json(newPost);
}

export async function PUT(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const res = await req.json();
  const { title, description, content, user, mainImage, slug } = res;

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    {
      title,
      description,
      content,
      user,
      mainImage,
      slug,
    },
    {
      new: true,
    }
  );

  return NextResponse.json(updatedPost);
}

export async function DELETE(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await Post.findByIdAndDelete(id);
  return NextResponse.json(true);
}
