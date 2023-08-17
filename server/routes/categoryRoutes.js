import express from "express";
import {
  categoryControlller,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

//routes
// create category
router.post("/create-category", requireSignIn, createCategoryController);

//update category
router.put("/update-category/:id", requireSignIn, updateCategoryController);

//getALl category //common routes
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:id", requireSignIn, singleCategoryController);

//delete category
router.delete("/delete-category/:id", requireSignIn, deleteCategoryController);

export default router;
