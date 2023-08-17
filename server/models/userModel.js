import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: "",
    },
    mobile: {
      type: String,
      default: "",
    },
    gstn: {
      type: String,
      default: "",
    },
    role: {
      type: Number,
      default: 2,
    },
  },
  { timestamps: true }
);

export default mongoose.model("user", userSchema);
