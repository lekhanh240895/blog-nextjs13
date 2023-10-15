import { mongooseConnect } from "@/app/lib/mongoose";
import User from "@/app/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);

  const query = Object.fromEntries(searchParams.entries());
  const conditions = Object.entries(query).map(([key, value]) => ({
    [key]: value,
  }));

  if (conditions.length > 0) {
    const user = await User.findOne({
      $or: conditions,
    }).select("-password");

    return NextResponse.json(user);
  }

  return NextResponse.json(await User.find({}).select("-password"));
}

export async function POST(req: Request) {
  await mongooseConnect();

  const res = await req.json();

  const { email, image, username, password } = res;

  if (!email || !username || !password) {
    return NextResponse.json("Please add all fields!", {
      status: 400,
      statusText: "Please add all fields!",
    });
  }

  const userExists = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (userExists) {
    return NextResponse.json("User already exists!", {
      status: 400,
      statusText: "User already exists!",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    email,
    image,
    username,
    password: hashPassword,
  });

  return NextResponse.json(newUser);
}

export async function PUT(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("_id");

  const res = await req.json();

  const { name, image, email, username, password, description } = res;

  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    res.password = hashPassword;
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      name,
      image,
      email,
      username,
      password,
      description,
    },
    {
      new: true,
    }
  ).select("-password");

  return NextResponse.json(updatedUser);
}

export async function DELETE(req: Request) {
  await mongooseConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("_id");

  await User.findByIdAndDelete(id);

  return NextResponse.json(true);
}
