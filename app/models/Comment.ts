import { model, Schema, models } from "mongoose";

const CommmentSchema = new Schema(
  {
    text: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    post: { type: Schema.Types.ObjectId, ref: "Post" },
    replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    name: { type: String },
    email: { type: String },
    comment: { type: Schema.Types.ObjectId, ref: "Comment" },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default models.Comment || model<Comment>("Comment", CommmentSchema);
