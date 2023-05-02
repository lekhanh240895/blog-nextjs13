import { mongooseConnect } from "@/app/lib/mongoose";
import Category from "@/app/models/Category";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (slug) {
    const category = await Category.find({
      slug,
    }).populate([
      {
        path: "parent",
        model: "Category",
      },
    ]);

    return NextResponse.json(category);
  }
}
