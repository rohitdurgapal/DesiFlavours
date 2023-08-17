import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    mobile: {
      type: Number,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("customer", customerSchema);
