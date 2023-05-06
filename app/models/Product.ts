import { model, Schema, models } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    images: [{ type: String }],
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    properties: { type: Object },
    slug: { type: String },
  },
  {
    timestamps: true,
  }
);

export default models.Product || model<Product>("Product", ProductSchema);
