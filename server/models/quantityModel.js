import mongoose from "mongoose";

const quantityModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    status: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("quantity", quantityModel);
