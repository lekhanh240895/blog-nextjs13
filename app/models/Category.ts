import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
  description: { type: String },
  title: { type: String, required: true },
  parent: { type: Schema.Types.ObjectId, ref: "Category" },
  properties: { type: Object },
});

export default models.Category || model<Category>("Category", CategorySchema);
