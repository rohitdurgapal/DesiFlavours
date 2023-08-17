import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    order_id: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
      required: true,
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "address",
      required: true,
    },
    statusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orderStatus",
      default: "64c78c2cbd2af1179d1f2040",
    },
    items: {
      type: Array,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    netPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 1,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: "64aba96fdcd94168c07122e1",
    },
  },
  { timestamps: true }
);
export default mongoose.model("order", orderSchema);
