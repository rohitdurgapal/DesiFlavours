import itemModel from "../models/itemModel.js";
import slugify from "slugify";

// create item
export const createItemController = async (req, res) => {
  try {
    const { name, categoryId, subCategoryId, popularId } = req.body;
    let { quantityId } = req.body;
    quantityId = JSON.parse(quantityId);
    if (!categoryId) {
      return res.status(400).send({ message: "Category is required" });
    }
    if (!subCategoryId) {
      return res.status(400).send({ message: "Sub Category is required" });
    }
    if (!name) {
      return res.status(400).send({ message: "Name is required" });
    }
    const item = new itemModel({
      name,
      slug: slugify(name),
      categoryId,
      subCategoryId,
      quantityId,
      popularId,
    });
    // Uploading image
    if (req.file) {
      let originalname = req.file.originalname.replace(/ /g, "-");
      let nameAdd = name.replace(/ /g, "-");
      item.itemImage = `${nameAdd}_${originalname}`;
    }
    await item.save();
    res.status(201).send({
      success: true,
      message: "New item created",
      item,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in item",
    });
  }
};

//update item
export const updateItemController = async (req, res) => {
  try {
    const { name, categoryId, subCategoryId, popularId } = req.body;
    const { id } = req.params;
    let { quantityId } = req.body;
    quantityId = JSON.parse(quantityId);
    if (!categoryId) {
      return res.status(400).send({ message: "Category is required" });
    }
    if (!subCategoryId) {
      return res.status(400).send({ message: "Sub Category is required" });
    }
    if (!name) {
      return res.status(400).send({ message: "Name is required" });
    }
    let itemData = {
      name,
      slug: slugify(name),
      categoryId,
      subCategoryId,
      quantityId,
      popularId,
    };
    // Uploading image
    if (req.file) {
      let originalname = req.file.originalname.replace(/ /g, "-");
      let nameAdd = name.replace(/ /g, "-");
      itemData.itemImage = `${nameAdd}_${originalname}`;
    }
    const item = await itemModel.findByIdAndUpdate(id, itemData, { new: true });
    res.status(200).send({
      success: true,
      messsage: "Item updated successfully",
      item,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating item",
    });
  }
};

// get all item
export const itemControlller = async (req, res) => {
  try {
    const item = await itemModel
      .find({ status: 1 })
      .populate("categoryId")
      .populate("subCategoryId")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All items list",
      item,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all items",
    });
  }
};

// single item
export const singleItemController = async (req, res) => {
  try {
    const item = await itemModel.findOne({ _id: req.params.id });
    res.status(200).send({
      success: true,
      message: "Get single item successfully",
      item,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single item",
    });
  }
};

//delete item
export const deleteItemController = async (req, res) => {
  try {
    const { id } = req.params;
    await itemModel.findByIdAndUpdate(
      id,
      {
        status: 0,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting item",
      error,
    });
  }
};

//get popular combo
export const getPopularComboControlller = async (req, res) => {
  try {
    const item = await itemModel
      .find({ status: 1, popularId: 1 })
      .sort({ createdAt: 1 });
    res.status(200).send({
      success: true,
      message: "Popular combo list",
      item,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting popular combo list",
    });
  }
};
