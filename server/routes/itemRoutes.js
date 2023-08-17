import express from "express";
import {
  itemControlller,
  createItemController,
  deleteItemController,
  singleItemController,
  updateItemController,
  getPopularComboControlller,
} from "../controllers/itemController.js";
const router = express.Router();
import multer from "multer";
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/items/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${req.body.name.replace(/ /g, "-")}_${file.originalname.replace(
        / /g,
        "-"
      )}`
    );
  },
});
const upload = multer({ storage: storage });
import { requireSignIn } from "../middlewares/authMiddleware.js";

//routes
// create item
router.post(
  "/create-item",
  upload.single("itemImage"),
  requireSignIn,
  createItemController
);

//update item
router.put(
  "/update-item/:id",
  upload.single("itemImage"),
  requireSignIn,
  updateItemController
);

//getALl item
router.get("/get-item", itemControlller);

//single item
router.get("/single-item/:id", requireSignIn, singleItemController);

//delete item
router.delete("/delete-item/:id", requireSignIn, deleteItemController);

//get popular combo
router.get("/get-popular-combo", getPopularComboControlller);

export default router;
