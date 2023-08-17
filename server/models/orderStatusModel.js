import mongoose from "mongoose";

const orderStatusSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);
export default mongoose.model("orderStatus", orderStatusSchema);
