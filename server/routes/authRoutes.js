import express from "express";
import {
  registerController,
  loginController,
  profileController,
  updateProfileController,
  profileContactController,
} from "../controllers/authController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

//routes
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/profile/:id", requireSignIn, profileController);
router.post("/update-profile", requireSignIn, updateProfileController);
//common routes
router.get("/profile-contact", profileContactController);

router.get("/admin-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
