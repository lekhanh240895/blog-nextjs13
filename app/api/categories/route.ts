import { mongooseConnect } from "@/app/lib/mongoose";
import Category from "@/app/models/Category";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);

  const query = Object.fromEntries(searchParams.entries());
  const conditions = Object.entries(query).map(([key, value]) => ({
    [key]: value,
  }));

  if (conditions.length > 0) {
    const category = await Category.findOne({
      $or: conditions,
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
  const id = searchParams.get("_id");

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
  const id = searchParams.get("_id");

  await Category.findByIdAndDelete(id);
  return NextResponse.json(true);
}
