import subCategoryModel from "../models/subCategoryModel.js";
import slugify from "slugify";

// create sub category
export const createSubCategoryController = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    if (!categoryId) {
      return res.status(400).send({ message: "Category is required" });
    }
    if (!name) {
      return res.status(400).send({ message: "Name is required" });
    }
    const existingName = await subCategoryModel.findOne({ name });
    if (existingName) {
      return res.status(500).send({
        success: false,
        message: "Sub category name already exist",
      });
    }
    const subcategory = await new subCategoryModel({
      name,
      slug: slugify(name),
      categoryId,
    }).save();
    res.status(201).send({
      success: true,
      message: "New sub category created",
      subcategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in sub category",
    });
  }
};

//update sub category
export const updateSubCategoryController = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const { id } = req.params;
    const subcategory = await subCategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name), categoryId },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Sub category updated successfully",
      subcategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating sub category",
    });
  }
};

// get all sub category
export const subCategoryControlller = async (req, res) => {
  try {
    const subcategory = await subCategoryModel
      .find({ status: 1 })
      .populate("categoryId")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All sub category list",
      subcategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all sub category",
    });
  }
};

// single sub category
export const singleSubCategoryController = async (req, res) => {
  try {
    const subcategory = await subCategoryModel.findOne({ _id: req.params.id });
    res.status(200).send({
      success: true,
      message: "Get single sub category successfully",
      subcategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single sub category",
    });
  }
};

//delete sub category
export const deleteSubCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await subCategoryModel.findByIdAndUpdate(
      id,
      {
        status: 0,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Sub category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting sub category",
      error,
    });
  }
};
