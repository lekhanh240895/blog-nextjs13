import { mongooseConnect } from "@/app/lib/mongoose";
import Category from "@/app/models/Category";
import Comment from "@/app/models/Comment";
import Post from "@/app/models/Post";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const postsPerPage = 6;

  if (page) {
    const posts = await Post.find({})
      .skip((parseInt(page, 10) - 1) * postsPerPage)
      .limit(postsPerPage)
      .sort({
        views: "desc",
      })
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
      ]);
    return NextResponse.json(posts);
  }

  const query = Object.fromEntries(searchParams.entries());

  const conditions = Object.entries(query).map(([key, value]) => ({
    [key]: value,
  }));

  if (conditions.length > 0) {
    const post = await Post.findOne({
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
      {
        path: "comments",
        model: Comment,
      },
    ]);

    return NextResponse.json(post);
  }

  const posts = await Post.find({})
    .sort({
      createdAt: "desc",
    })
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
    ]);

  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  await mongooseConnect();

  const request = await req.json();

  const {
    title,
    description,
    content,
    user,
    mainImage,
    slug,
    category,
    readTime,
  } = request;

  const newPost = await Post.create({
    title,
    description,
    content,
    user,
    mainImage,
    slug,
    category: category || undefined,
    readTime,
  });

  return NextResponse.json(newPost);
}

export async function PUT(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("_id");

  const res = await req.json();
  const {
    title,
    description,
    content,
    user,
    mainImage,
    slug,
    category,
    views,
    readTime,
  } = res;

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    {
      title,
      description,
      content,
      user,
      mainImage,
      slug,
      views,
      category: category || undefined,
      readTime,
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
  const id = searchParams.get("_id");

  await Post.findByIdAndDelete(id);
  return NextResponse.json(true);
}
