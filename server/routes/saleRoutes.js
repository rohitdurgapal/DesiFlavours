import express from "express";
import {
  saleControlller,
  createSaleController,
  singleSaleController,
  updateSaleController,
  deleteSaleController,
  updateRestaurantController,
} from "../controllers/saleController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

//routes
// create item
router.post("/create-sale", requireSignIn, createSaleController);

//update item
router.put("/update-sale/:id", requireSignIn, updateSaleController);

//getALl item
router.get("/get-sale", requireSignIn, saleControlller);

//single item
router.get("/single-sale/:id", requireSignIn, singleSaleController);

//delete item
router.delete("/delete-sale/:id", requireSignIn, deleteSaleController);

//change restaurant
router.post("/update-restaurant", requireSignIn, updateRestaurantController);

export default router;
