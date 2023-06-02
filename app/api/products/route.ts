import { mongooseConnect } from "@/app/lib/mongoose";
import Category from "@/app/models/Category";
import Product from "@/app/models/Product";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);

  const query = Object.fromEntries(searchParams.entries());
  const conditions = Object.entries(query).map(([key, value]) => ({
    [key]: value,
  }));

  if (conditions.length > 0) {
    const product = await Product.findOne({
      $or: conditions,
    }).populate([
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

  const { title, description, price, images, category, properties, slug } =
    request;

  const newProduct = await Product.create({
    title,
    description,
    price,
    images,
    category: category || undefined,
    properties,
    slug,
  });

  return NextResponse.json(newProduct);
}

export async function PUT(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("_id");

  const res = await req.json();
  const { title, description, price, images, category, properties, slug } = res;

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      title,
      description,
      price,
      images,
      category: category || undefined,
      properties,
      slug,
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
  const id = searchParams.get("_id");

  await Product.findByIdAndDelete(id);
  return NextResponse.json(true);
}
