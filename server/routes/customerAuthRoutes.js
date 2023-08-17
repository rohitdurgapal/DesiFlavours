import express from "express";
import {
  verifyMobileController,
  loginController,
} from "../controllers/customerAuthController.js";
import { requireSignInCustomer } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

//routes
router.post("/verify-mobile", verifyMobileController);
router.put("/login/:id", loginController);
router.get("/customer-auth", requireSignInCustomer, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
