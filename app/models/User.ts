import { model, Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, default: `User${Date.now()}` },
    email: { type: String, default: "" },
    image: { type: String, default: "" },
    bio: { type: String, default: "" },
    description: { type: String, default: "" },
    username: { type: String, default: `User${Date.now()}` },
    password: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export default models.User || model<User>("User", UserSchema);
