import { Router } from "express";
import isLogin from "../middleware/islogin.js";
import {
  createOrder,
  getMyAllOrders,
  getSingleOrderDetails,
  getAllOrders,
  changeOrderStatus,
} from "../Controller/orderController.js";
import isAdmin from "../middleware/isAdmin.js";

const orderRoutes = Router();

orderRoutes.post("/create", isLogin, createOrder);
orderRoutes.get("/getMyAll-orders", isLogin, getMyAllOrders);
orderRoutes.get("/getOrder/:id", isLogin, getSingleOrderDetails);

// =========  Admin Routes ============
orderRoutes.get("/admin/get-all-orders", isLogin, isAdmin, getAllOrders);

// change order status
orderRoutes.put("/admin/order/:id", isLogin, isAdmin, changeOrderStatus);

export default orderRoutes;
