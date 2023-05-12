import { mongooseConnect } from "@/app/lib/mongoose";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await mongooseConnect();
  const res = await req.json();

  const { email, password } = res;
  const user = await User.findOne({ email, password });

  return NextResponse.json(user);
}
