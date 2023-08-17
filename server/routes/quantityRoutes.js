import express from "express";
import {
  quantityControlller,
  createQuantityController,
  deleteQuantityController,
  singleQuantityController,
  updateQuantityController,
} from "../controllers/quantityController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

//routes
// create quantity
router.post("/create-quantity", requireSignIn, createQuantityController);

//update quantity
router.put("/update-quantity/:id", requireSignIn, updateQuantityController);

//getALl quantity
router.get("/get-quantity", requireSignIn, quantityControlller);

//single quantity
router.get("/single-quantity/:id", requireSignIn, singleQuantityController);

//delete quantity
router.delete("/delete-quantity/:id", requireSignIn, deleteQuantityController);

export default router;
