import express from "express";
import {
  saveOrderControlller,
  createOrderStatusControlller,
  orderControlller,
  orderHistoryController,
  orderStatusControlller,
  updateOrderHistoryController,
  customerOrderControlller,
  singleOrderController,
  getOrderCountController,
  updateRestaurantController,
} from "../controllers/orderController.js";
import {
  requireSignIn,
  requireSignInCustomer,
} from "../middlewares/authMiddleware.js";
const router = express.Router();

//routes
// customer order
router.get("/get-order/:userId", requireSignInCustomer, customerOrderControlller);
router.post("/save-order", requireSignInCustomer, saveOrderControlller);
router.get("/get-order-history-customer/:orderId", requireSignInCustomer, orderHistoryController);
router.get("/single-order-customer/:id", requireSignInCustomer, singleOrderController);

//admin order
router.get("/get-order", requireSignIn, orderControlller);
router.get("/single-order/:id", requireSignIn, singleOrderController);
router.get("/get-order-count", requireSignIn, getOrderCountController);
router.post("/update-restaurant", requireSignIn, updateRestaurantController);

//order status
router.post("/create-order-status", requireSignIn, createOrderStatusControlller);
router.get("/get-order-status", requireSignIn, orderStatusControlller);

//order history
router.get("/get-order-history/:orderId", requireSignIn, orderHistoryController);
router.post("/update-order-history", requireSignIn, updateOrderHistoryController);

export default router;
