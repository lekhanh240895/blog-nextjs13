import { model, Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

export default models.User || model<User>("User", UserSchema);
