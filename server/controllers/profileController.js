import addressModel from "../models/addressModel.js";
import customerModel from "../models/customerModel.js";

// create address
export const createAddressController = async (req, res) => {
  try {
    const { name, userId } = req.body;
    if (!name) {
      return res.status(400).send({ message: "Name is required" });
    }
    if (!userId) {
      return res.status(400).send({ message: "User id is required" });
    }
    const existingName = await addressModel.findOne({ name, userId });
    if (existingName) {
      return res.status(500).send({
        success: false,
        message: "Address already exist",
      });
    }
    const address = await new addressModel({
      name,
      userId,
    }).save();
    res.status(201).send({
      success: true,
      message: "New address created",
      address,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in address",
    });
  }
};

//update address
export const updateAddressController = async (req, res) => {
  try {
    const { name, userId } = req.body;
    const { id } = req.params;
    const address = await addressModel.findByIdAndUpdate(
      id,
      { name, userId },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Address updated successfully",
      address,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating address",
    });
  }
};

// get all address
export const addressControlller = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).send({ message: "User id is required" });
    }
    const address = await addressModel
      .find({ userId, status: 1 })
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All address list",
      address,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all address",
    });
  }
};

// single address
export const singleAddressController = async (req, res) => {
  try {
    const address = await addressModel.findOne({ _id: req.params.id });
    res.status(200).send({
      success: true,
      message: "Get single address successfully",
      address,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single address",
    });
  }
};

//delete address
export const deleteAddressController = async (req, res) => {
  try {
    const { id } = req.params;
    await addressModel.findByIdAndUpdate(
      id,
      {
        status: 0,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting address",
      error,
    });
  }
};

//update profile
export const updateProfileController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    if (!name) {
      return res.status(400).send({ message: "Name is required" });
    }
    const user = await customerModel.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating profile",
    });
  }
};

// get profile
export const singleProfileController = async (req, res) => {
  try {
    const user = await customerModel.findOne({ _id: req.params.userId });
    res.status(200).send({
      success: true,
      message: "Get single profile successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single profile",
    });
  }
};

// get all customer
export const getCustomerController = async (req, res) => {
  try {
    const customer = await customerModel.find().sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All customer list",
      customer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all customer",
    });
  }
};
