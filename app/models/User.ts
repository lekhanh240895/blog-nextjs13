import { model, Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, default: `User${Date.now()}` },
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
    image: { type: String, default: "" },
    bio: { type: String, default: "" },
    description: { type: String, default: "" },
    username: {
      type: String,
      default: `User${Date.now()}`,
      unique: [true, "Username already exists"],
      required: [true, "Username is required"],
    },
    password: { type: String, default: "" },
    role: { type: String, default: "user" },
  },
  {
    timestamps: true,
  }
);

export default models.User || model<User>("User", UserSchema);
