import { mongooseConnect } from "@/app/lib/mongoose";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);

  const query = searchParams.get("q") || "";

  const users: User[] = await User.find({
    name: new RegExp(query.normalize("NFD"), "i"),
  });

  return NextResponse.json(users);
}
