import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  addProductImage,
  updateProductImage,
  deleteProductImage,
  deleteProduct,
  createReview,
  getTopProducts,
} from "../Controller/productController.js";
import isLogin from "../middleware/islogin.js";
import { singleUpload } from "../middleware/multer.js";
import isAdmin from "../middleware/isAdmin.js";

const productRoutes = Router();

productRoutes.get("/getAll-products", getAllProducts);
productRoutes.get("/getTop-products", getTopProducts);
productRoutes.get("/:id", getSingleProduct);
productRoutes.put("/:id/review", isLogin, createReview);
// ===================  Admin routes  =================
productRoutes.post("/create", singleUpload, isLogin, isAdmin, createProduct);

productRoutes.put("/:id", isLogin, isAdmin, updateProduct);

productRoutes.put(
  "/image/:id",
  singleUpload,
  isLogin,
  isAdmin,
  addProductImage
);
productRoutes.put(
  "/image-update/:id",
  singleUpload,
  isLogin,
  isAdmin,
  updateProductImage
);

productRoutes.delete("/delete-image/:id", isLogin, isAdmin, deleteProductImage);
productRoutes.delete("/delete/:id", isLogin, isAdmin, deleteProduct);

export default productRoutes;
