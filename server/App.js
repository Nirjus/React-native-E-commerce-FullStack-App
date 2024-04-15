import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import userRoutes from "./routes/userRouter.js";
import productRoutes from "./routes/productRouter.js";
import categoryRoutes from "./routes/categoryRouter.js";
import addressRoutes from "./routes/addressRouter.js";
import orderRoutes from "./routes/orderRouter.js";
import bannerRoutes from "./routes/bannerRoute.js";
const App = express();

App.use(helmet());
App.use(mongoSanitize());
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(cookieParser());
App.use(morgan("dev"));

App.use(cors());

App.get("/", (req, res) => {
  res.status(201).send({
    success: true,
    message: "API is running",
  });
});

// Api routes
App.use("/api/v1/user", userRoutes);
App.use("/api/v1/product", productRoutes);
App.use("/api/v1/category", categoryRoutes);
App.use("/api/v1/address", addressRoutes);
App.use("/api/v1/order", orderRoutes);
App.use("/api/v1/banner", bannerRoutes);

App.use((error, req, res, next) => {
  return res.status(500).send({
    success: false,
    message: error.message,
  });
});

export default App;
