import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    sale_id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
    },
    mobile: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
      validate: [(value) => value.length > 0, "Select atlease one item."],
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

export default mongoose.model("Sale", saleSchema);
