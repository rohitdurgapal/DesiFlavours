import customerModel from "../models/customerModel.js";
import addressModel from "../models/addressModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

//VERIFY MOBILE
export const verifyMobileController = async (req, res) => {
  try {
    const { mobile } = req.body;
    if (!mobile) {
      return res.status(400).send({ message: "Mobile no. is required" });
    }
    if (mobile.toString().length < 10 || mobile.toString().length > 10) {
      return res
        .status(400)
        .send({ message: "Mobile number should contain 10 digits" });
    }
    //check user
    const user = await customerModel.findOne({ mobile });
    let userData;
    if (!user) {
      userData = await new customerModel({
        mobile,
      }).save();
    } else {
      userData = await customerModel.findByIdAndUpdate(
        user._id,
        {
          mobile,
        },
        { upsert: true }
      );
    }
    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        _id: userData._id,
        mobile: userData.mobile,
        name: userData.name,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Enter valid mobile number",
      error,
    });
  }
};

//VERIFY LOGIN
export const loginController = async (req, res) => {
  try {
    const { name, address, password, signFlag } = req.body;
    const { id } = req.params;
    let userData, addressData;
    if (signFlag === 1) {
      userData = await customerModel.findOne({ _id: id });
      const match = await comparePassword(password, userData.password);
      if (!match) {
        return res.status(500).send({
          success: false,
          message: "Invalid password",
        });
      }
    } else {
      if (!name) {
        return res.status(400).send({ message: "Name is required" });
      }
      if (!address) {
        return res.status(400).send({ message: "Address is required" });
      }
      if (!password) {
        return res.status(400).send({ message: "Password is required" });
      }
      //check user
      const hashedPassword = await hashPassword(password);
      userData = await customerModel.findByIdAndUpdate(
        id,
        {
          name,
          password: hashedPassword,
        },
        { upsert: true }
      );
      addressData = await new addressModel({
        name: address,
        userId: userData._id,
      }).save();
    }
    //token
    const token = await JWT.sign(
      { _id: userData._id },
      process.env.JWT_SECRET_CUSTOMER,
      {
        expiresIn: "7d",
      }
    );
    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        _id: userData._id,
        name: userData.name,
        mobile: userData.mobile,
        role: userData.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
