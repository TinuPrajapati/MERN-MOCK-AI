import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "student" },
});

export const User = mongoose.model("User", UserSchema);
