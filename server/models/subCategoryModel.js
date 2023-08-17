import mongoose from "mongoose";

const subCategoryModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model("subCategory", subCategoryModel);
