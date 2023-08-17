import express from "express";
import {
  addressControlller,
  createAddressController,
  deleteAddressController,
  singleAddressController,
  updateAddressController,
  updateProfileController,
  singleProfileController,
  getCustomerController,
} from "../controllers/profileController.js";
import { requireSignIn,requireSignInCustomer } from "../middlewares/authMiddleware.js";
const router = express.Router();

//routes
// create address
router.post("/create-address", requireSignInCustomer, createAddressController);

//update address
router.put("/update-address/:id", requireSignInCustomer, updateAddressController);

//getALl address
router.get("/get-address/:userId", requireSignInCustomer, addressControlller);

//single address
router.get("/single-address/:id", requireSignInCustomer, singleAddressController);

//delete address
router.delete("/delete-address/:id", requireSignInCustomer, deleteAddressController);

//update profile
router.put("/update-profile/:id", requireSignInCustomer, updateProfileController);

// get single profile
router.get("/get-profile/:userId", requireSignInCustomer, singleProfileController);

//get customer list
router.get("/customer-list", requireSignIn, getCustomerController);

export default router;
