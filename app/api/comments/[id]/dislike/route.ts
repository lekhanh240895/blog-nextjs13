import { mongooseConnect } from "@/app/lib/mongoose";
import Comment from "@/app/models/Comment";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  await mongooseConnect();

  const res = await req.json();

  const { userId } = res;

  const comment = await Comment.findById(id);

  if (!comment.dislikes.includes(userId)) {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      {
        $push: { dislikes: userId },
      },
      {
        new: true,
      }
    );
    return NextResponse.json(updatedComment);
  } else {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      {
        $pull: { dislikes: userId },
      },
      {
        new: true,
      }
    );
    return NextResponse.json(updatedComment);
  }
}
