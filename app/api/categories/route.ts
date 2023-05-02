import { mongooseConnect } from "@/app/lib/mongoose";
import Category from "@/app/models/Category";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const slug = searchParams.get("slug");

  if (id || slug) {
    const category = await Category.findOne({
      $and: [
        {
          id,
        },
        { slug },
      ],
    }).populate({
      path: "parent",
      model: "Category",
    });

    return NextResponse.json(category);
  }

  const categories = await Category.find({}).populate({
    path: "parent",
    model: "Category",
  });

  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  await mongooseConnect();

  const request = await req.json();

  const { title, description, parent, properties, slug } = request;

  const newCategory = await Category.create({
    title,
    description,
    parent: parent || undefined,
    properties,
    slug,
  });

  return NextResponse.json(newCategory);
}

export async function PUT(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const res = await req.json();
  const { title, description, parent, properties, slug } = res;

  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    {
      title,
      description,
      parent: parent || undefined,
      properties,
      slug,
    },
    {
      new: true,
    }
  );

  return NextResponse.json(updatedCategory);
}

export async function DELETE(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await Category.findByIdAndDelete(id);
  return NextResponse.json(true);
}
