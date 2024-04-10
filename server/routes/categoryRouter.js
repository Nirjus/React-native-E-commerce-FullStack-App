import { Router } from "express";

import isLogin from "../middleware/islogin.js";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../Controller/categoryController.js";
import isAdmin from "../middleware/isAdmin.js";
import { singleUpload } from "../middleware/multer.js";

const categoryRoutes = Router();

categoryRoutes.get("/getAll-category", getAllCategory);

categoryRoutes.post("/create", isLogin, isAdmin, singleUpload, createCategory);

categoryRoutes.put(
  "/update/:id",
  isLogin,
  isAdmin,
  singleUpload,
  updateCategory
);

categoryRoutes.delete("/delete/:id", isLogin, isAdmin, deleteCategory);

export default categoryRoutes;
