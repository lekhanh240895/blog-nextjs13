import { mongooseConnect } from "@/app/lib/mongoose";
import Post from "@/app/models/Post";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await mongooseConnect();

    await Post.findByIdAndUpdate(id, {
      $inc: {
        views: 1,
      },
    });
    return NextResponse.json({ viewsIncre: true });
  } catch (error: any) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
