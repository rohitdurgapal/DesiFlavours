import mongoose from "mongoose";

const orderHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
      required: true,
    },
    statusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orderStatus",
      default: "64c78c2cbd2af1179d1f2040",
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      required: true,
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);
export default mongoose.model("orderHistory", orderHistorySchema);
