import { mongooseConnect } from "@/app/lib/mongoose";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    return NextResponse.json(await User.findById(id));
  }

  return NextResponse.json(await User.find({}));
}

export async function POST(req: Request) {
  await mongooseConnect();

  const request = await req.json();

  const { name, email, image } = request;

  const newUser = await User.create({ name, email, image });

  return NextResponse.json(newUser);
}

export async function PUT(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const res = await req.json();

  const { name, image, email } = res;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      name,
      image,
      email,
    },
    {
      new: true,
    }
  );

  return NextResponse.json(updatedUser);
}

export async function DELETE(req: Request) {
  await mongooseConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await User.findByIdAndDelete(id);

  return NextResponse.json("delete ok");
}
