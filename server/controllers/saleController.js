import saleModel from "../models/saleModel.js";

// create sale
export const createSaleController = async (req, res) => {
  try {
    const { name, mobile, address, items, total, discount, netPrice } =
      req.body;
    if (!mobile) {
      return res.status(400).send({ message: "Mobile is required" });
    }
    if (!address) {
      return res.status(400).send({ message: "Address is required" });
    }
    let count = await saleModel.find().count();
    count = count + 1;
    const sale = await new saleModel({
      sale_id: count,
      name,
      mobile,
      address,
      items,
      total,
      discount,
      netPrice,
    }).save();
    res.status(201).send({
      success: true,
      message: "New sale created",
      sale,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in sale",
    });
  }
};

// get all sale
export const saleControlller = async (req, res) => {
  try {
    const sale = await saleModel
      .find({ status: 1 })
      .populate("restaurantId")
      .sort({ sale_id: -1 });
    res.status(200).send({
      success: true,
      message: "All sales list",
      sale,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all sale",
    });
  }
};

// single item
export const singleSaleController = async (req, res) => {
  try {
    const sale = await saleModel
      .findOne({ _id: req.params.id })
      .populate("restaurantId");
    res.status(200).send({
      success: true,
      message: "Get single sale successfully",
      sale,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single sale",
    });
  }
};

//update sale
export const updateSaleController = async (req, res) => {
  try {
    const { name, mobile, address, items, total, discount, netPrice } =
      req.body;
    if (!mobile) {
      return res.status(400).send({ message: "Mobile is required" });
    }
    if (!address) {
      return res.status(400).send({ message: "Address is required" });
    }
    const { id } = req.params;
    const sale = await saleModel.findByIdAndUpdate(
      id,
      {
        name,
        mobile,
        address,
        items,
        total,
        discount,
        netPrice,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Sale updated successfully",
      sale,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating sale",
    });
  }
};

//delete sale
export const deleteSaleController = async (req, res) => {
  try {
    const { id } = req.params;
    await saleModel.findByIdAndUpdate(
      id,
      {
        status: 0,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Sale deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting sale",
      error,
    });
  }
};

//Update restaurant
export const updateRestaurantController = async (req, res) => {
  try {
    const { saleId, restaurantId } = req.body;
    if (!restaurantId) {
      return res.status(400).send({ message: "Select Restaurant" });
    }

    const changeRestaurant = await saleModel.findByIdAndUpdate(
      saleId,
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
