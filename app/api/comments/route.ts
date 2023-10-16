import { mongooseConnect } from "@/app/lib/mongoose";
import Category from "@/app/models/Category";
import Comment from "@/app/models/Comment";
import Post from "@/app/models/Post";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);

  const query = Object.fromEntries(searchParams.entries());

  const conditions = Object.entries(query).map(([key, value]) => ({
    [key]: value,
  }));

  if (conditions.length > 0) {
    const comments = await Comment.find({
      $or: conditions,
    }).populate([
      {
        path: "user",
        model: User,
        select: "-password",
      },
      {
        path: "replies",
        model: Comment,
        populate: [
          {
            path: "user",
            model: User,
            select: "-password",
          },
        ],
      },
      {
        path: "post",
        model: Post,
        populate: [
          {
            path: "user",
            model: User,
            select: "-password",
          },
          {
            path: "category",
            model: Category,
            populate: {
              path: "parent",
              model: "Category",
            },
          },
        ],
      },
      {
        path: "likes",
        model: User,
      },
      {
        path: "dislikes",
        model: User,
      },
    ]);

    return NextResponse.json(comments);
  }

  return NextResponse.json(
    await Comment.find({}).populate([
      {
        path: "user",
        model: User,
        select: "-password",
      },
      {
        path: "post",
        model: Post,
        populate: [
          {
            path: "user",
            model: User,
            select: "-password",
          },
          {
            path: "category",
            model: Category,
            populate: {
              path: "parent",
              model: "Category",
            },
          },
        ],
      },
    ])
  );
}

export async function POST(req: Request) {
  await mongooseConnect();

  const request = await req.json();

  const { text, post, user, name, email } = request;

  const newComment = await Comment.create({
    text,
    post,
    user,
    name,
    email,
  });

  await Post.findByIdAndUpdate(post, {
    $push: {
      comments: newComment._id,
    },
  });

  return NextResponse.json(newComment);
}

export async function PUT(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("_id");

  const res = await req.json();

  const { text, post, user, name, email, replies, likes, dislikes } = res;

  const updatedComment = await Comment.findByIdAndUpdate(
    id,
    {
      text,
      post,
      user,
      name,
      email,
      replies,
      likes,
      dislikes,
    },
    {
      new: true,
    }
  );

  return NextResponse.json(updatedComment);
}

export async function DELETE(req: Request) {
  await mongooseConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("_id");

  await Comment.findByIdAndDelete(id);

  return NextResponse.json(true);
}
