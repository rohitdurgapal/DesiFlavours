import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoutes.js";
import categoryRoute from "./routes/categoryRoutes.js";
import subCategoryRoute from "./routes/subCategoryRoutes.js";
import quantityRoute from "./routes/quantityRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";
//customer
import customerAuthRoutes from "./routes/customerAuthRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cors from "cors";

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads/items", express.static("uploads/items"));
app.use("/uploads/dummy", express.static("uploads/dummy"));

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/sub-category", subCategoryRoute);
app.use("/api/v1/quantity", quantityRoute);

app.use("/api/v1/items", itemRoutes);
app.use("/api/v1/sales", saleRoutes);

//customer routes
app.use("/api/v1/sign-in", customerAuthRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/order", orderRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Billing Application</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`);
});
