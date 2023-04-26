import { model, Schema, models } from "mongoose";

const PostSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    content: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    mainImage: { type: String },
    slug: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  {
    timestamps: true,
  }
);

export default models.Post || model<Post>("Post", PostSchema);
