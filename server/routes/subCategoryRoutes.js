import express from "express";
import {
  subCategoryControlller,
  createSubCategoryController,
  deleteSubCategoryController,
  singleSubCategoryController,
  updateSubCategoryController,
} from "../controllers/subCategoryController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

//routes
// create sub-category
router.post("/create-sub-category", requireSignIn, createSubCategoryController);

//update sub-category
router.put(
  "/update-sub-category/:id",
  requireSignIn,
  updateSubCategoryController
);

//getALl sub-category //common routes
router.get("/get-sub-category", subCategoryControlller);

//single sub-category
router.get(
  "/single-sub-category/:id",
  requireSignIn,
  singleSubCategoryController
);

//delete sub-category
router.delete(
  "/delete-sub-category/:id",
  requireSignIn,
  deleteSubCategoryController
);

export default router;
