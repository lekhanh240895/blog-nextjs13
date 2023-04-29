import { mongooseConnect } from "@/app/lib/mongoose";
import Category from "@/app/models/Category";
import Product from "@/app/models/Product";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const product = await Product.findById(id).populate([
      {
        path: "category",
        model: Category,
        populate: {
          path: "parent",
          model: "Category",
        },
      },
    ]);

    return NextResponse.json(product);
  }

  const products = await Product.find({}).populate([
    {
      path: "category",
      model: Category,
      populate: {
        path: "parent",
        model: "Category",
      },
    },
  ]);

  return NextResponse.json(products);
}

export async function POST(req: Request) {
  await mongooseConnect();

  const request = await req.json();

  const { title, description, price, images, category, properties } = request;

  if (!mongoose.Types.ObjectId.isValid(category)) {
    const newProduct = await Product.create({
      title,
      description,
      price,
      images,
      properties,
    });

    return NextResponse.json(newProduct);
  }

  const newProduct = await Product.create({
    title,
    description,
    price,
    images,
    category,
    properties,
  });

  return NextResponse.json(newProduct);
}

export async function PUT(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const res = await req.json();
  const { title, description, price, images, category, properties } = res;

  if (!mongoose.Types.ObjectId.isValid(category)) {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        images,
        properties,
        $unset: { category: 1 },
      },
      {
        new: true,
      }
    );

    return NextResponse.json(updatedProduct);
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      title,
      description,
      price,
      images,
      category,
      properties,
    },
    {
      new: true,
    }
  );

  return NextResponse.json(updatedProduct);
}

export async function DELETE(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await Product.findByIdAndDelete(id);
  return NextResponse.json(true);
}
