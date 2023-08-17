import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subCategory",
    },
    quantityId: {
      type: Array,
      required: true,
      validate: [(value) => value.length > 0, "Select atlease one quantity"],
    },
    status: {
      type: Number,
      default: 1,
    },
    popularId: {
      type: Number,
      default: 0,
    },
    itemImage: {
      type: String,
    },
  },
  { timestamps: true }
);

itemSchema.index(
  { name: 1, categoryId: 1, subCategoryId: 1 },
  { unique: true }
);
export default mongoose.model("item", itemSchema);
