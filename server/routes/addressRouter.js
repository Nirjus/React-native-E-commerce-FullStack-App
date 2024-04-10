import { Router } from "express";
import {
  createAddress,
  getAllAddress,
  updateAddress,
  deleteAddress,
  getMyAddress,
} from "../Controller/addressController.js";
import isLogin from "../middleware/islogin.js";
import isAdmin from "../middleware/isAdmin.js";

const addressRoutes = Router();

addressRoutes.get("/getAll-address", isLogin, isAdmin, getAllAddress);

addressRoutes.get("/getMy-address", isLogin, getMyAddress);

addressRoutes.post("/create", isLogin, createAddress);

addressRoutes.put("/update/:id", isLogin, updateAddress);

addressRoutes.delete("/delete/:id", isLogin, deleteAddress);

export default addressRoutes;
