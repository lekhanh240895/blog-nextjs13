import { mongooseConnect } from "@/app/lib/mongoose";
import Category from "@/app/models/Category";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const category = await Category.findById(id).populate({
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

  const { title, description, parent } = request;

  if (!mongoose.Types.ObjectId.isValid(parent)) {
    const newCategory = await Category.create({ title, description });
    return NextResponse.json(newCategory);
  }

  const newCategory = await Category.create({ title, description, parent });
  return NextResponse.json(newCategory);
}

export async function PUT(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const res = await req.json();
  const { title, description, parent } = res;

  if (!mongoose.Types.ObjectId.isValid(parent)) {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { title, description, $unset: { parent: 1 } },
      {
        new: true,
      }
    );

    return NextResponse.json(updatedCategory);
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    { title, description, parent },
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
