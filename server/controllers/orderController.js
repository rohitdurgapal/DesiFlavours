import orderModel from "../models/orderModel.js";
import orderStatusModel from "../models/orderStatusModel.js";
import orderHistoryModel from "../models/orderHistory.js";

// save order
export const saveOrderControlller = async (req, res) => {
  try {
    const { userId, addressId, items, total, discount, netPrice } = req.body;
    if (!addressId) {
      return res.status(400).send({ message: "Select delivery address" });
    }
    let count = await orderModel.find().count();
    count = count + 1;
    const order = await new orderModel({
      order_id: count,
      userId,
      addressId,
      items,
      total,
      discount,
      netPrice,
    }).save();
    await new orderHistoryModel({
      userId,
      orderId: order._id,
    }).save();
    res.status(201).send({
      success: true,
      message: "Your order is placed",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in order",
    });
  }
};

//get order
export const orderControlller = async (req, res) => {
  try {
    const order = await orderModel
      .find({ status: 1 })
      .populate("userId")
      .populate("addressId")
      .populate("statusId")
      .populate("restaurantId")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All order list",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all order",
    });
  }
};

//save order status
export const createOrderStatusControlller = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({ message: "Name is required" });
    }
    const orderStatus = await new orderStatusModel({
      name,
    }).save();
    res.status(201).send({
      success: true,
      message: "New order status created",
      orderStatus,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in order status",
    });
  }
};

//Get order history
export const orderHistoryController = async (req, res) => {
  try {
    const orderHistory = await orderHistoryModel
      .find({
        orderId: req.params.orderId,
      })
      .populate("statusId")
      .sort({ createdAt: 1 });
    res.status(200).send({
      success: true,
      message: "Get order history successfully",
      orderHistory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting order history",
    });
  }
};

//Get order status
export const orderStatusControlller = async (req, res) => {
  try {
    const orderStatus = await orderStatusModel
      .find({ status: 1 })
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All order status list",
      orderStatus,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all order status",
    });
  }
};

//Get order by customer
export const customerOrderControlller = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orderByCustomer = await orderModel
      .find({ userId, status: 1 })
      .populate("userId")
      .populate("addressId")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All order list by customer",
      orderByCustomer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting order",
    });
  }
};

//Update order status and order status id
export const updateOrderHistoryController = async (req, res) => {
  try {
    const { orderId, orderStatusId, userId } = req.body;
    if (!orderStatusId) {
      return res.status(400).send({ message: "Select order status" });
    }

    await orderModel.findByIdAndUpdate(
      orderId,
      { statusId: orderStatusId },
      { new: true }
    );

    const orderHistory = await new orderHistoryModel({
      orderId,
      statusId: orderStatusId,
      userId,
    }).save();
    res.status(201).send({
      success: true,
      message: "Order status updated",
      orderHistory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in order status",
    });
  }
};

// single order
export const singleOrderController = async (req, res) => {
  try {
    const order = await orderModel
      .findOne({ _id: req.params.id })
      .populate("userId")
      .populate("addressId")
      .populate("restaurantId");
    res.status(200).send({
      success: true,
      message: "Get single order successfully",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single order",
    });
  }
};

//get order count
export const getOrderCountController = async (req, res) => {
  try {
    const orderCount = await orderModel
      .find({
        statusId: "64c78c2cbd2af1179d1f2040",
      })
      .count();
    res.status(200).send({
      success: true,
      message: "Get order count successfully",
      orderCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting order count",
    });
  }
};

//Update restaurant
export const updateRestaurantController = async (req, res) => {
  try {
    const { orderId, restaurantId } = req.body;
    if (!restaurantId) {
      return res.status(400).send({ message: "Select Restaurant" });
    }

    const changeRestaurant = await orderModel.findByIdAndUpdate(
      orderId,
      { restaurantId },
      { new: true }
    );
    res.status(201).send({
      success: true,
      message: "Restaurant updated",
      changeRestaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating restaurant",
    });
  }
};
