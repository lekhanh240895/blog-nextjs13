import { mongooseConnect } from "@/app/lib/mongoose";
import User from "@/app/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  await mongooseConnect();
  const res = await req.json();

  const { email, password, username } = res;

  if ((!email && !username) || !password) {
    return NextResponse.json("Please add all fields!", {
      status: 400,
      statusText: "Please add all fields!",
    });
  }

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    return NextResponse.json("User not found!", {
      status: 400,
      statusText: "User not found!",
    });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return NextResponse.json("Incorrect password!", {
      status: 400,
      statusText: "Incorrect password!",
    });
  }

  return NextResponse.json(user);
}
