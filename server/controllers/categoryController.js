import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
// create category
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({ message: "Name is required" });
    }
    const existingName = await categoryModel.findOne({ name });
    if (existingName) {
      return res.status(500).send({
        success: false,
        message: "Category name already exist",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "New category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in category",
    });
  }
};

//update category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

// get all category
export const categoryControlller = async (req, res) => {
  try {
    const category = await categoryModel
      .find({ status: 1 })
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All category list",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all category",
    });
  }
};

// single category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ _id: req.params.id });
    res.status(200).send({
      success: true,
      message: "Get single category successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single category",
    });
  }
};

//delete category
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndUpdate(
      id,
      {
        status: 0,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting category",
      error,
    });
  }
};
