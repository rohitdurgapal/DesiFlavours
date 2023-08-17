import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
      required: true,
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);
addressSchema.index({ name: 1, userId: 1 }, { unique: true });
export default mongoose.model("address", addressSchema);
