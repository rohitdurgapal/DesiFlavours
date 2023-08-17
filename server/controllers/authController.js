import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

//register user
export const registerController = async (req, res) => {
  try {
    const { name, email, password, secretCode } = req.body;
    if (!secretCode || secretCode !== process.env.JWT_SECRET) {
      return res.status(400).send({ message: "Secret code is required" });
    }
    if (!name) {
      return res.status(400).send({ message: "Name is required" });
    }
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is required" });
    }
    //check user exist
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(500).send({
        success: false,
        message: "This email is already exist",
      });
    }
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User register successfully",
      userData: user,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

//login user
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is required" });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "Invalid password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
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

// get user profile
export const profileController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.params.id });
    res.status(200).send({
      success: true,
      message: "Get profile successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
        gstn: user.gstn,
        mobile: user.mobile,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting profile",
    });
  }
};

//get all user
export const profileContactController = async (req, res) => {
  try {
    const user = await userModel
      .find({ role: 2 })
      .select("-password")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All profile list",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all profile",
    });
  }
};

// update profile
export const updateProfileController = async (req, res) => {
  try {
    const { id, name, address, mobile, gstn } = req.body;
    if (!id) {
      return res.status(400).send({ message: "User id is required" });
    }
    const profile = await userModel.findByIdAndUpdate(
      id,
      { name, address, mobile, gstn },
      { new: true }
    );
    res.status(201).send({
      success: true,
      message: "Profile updated",
      profile: {
        _id: profile._id,
        name: profile.name,
        email: profile.email,
        address: profile.address,
        gstn: profile.gstn,
        mobile: profile.mobile,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in profile",
    });
  }
};
