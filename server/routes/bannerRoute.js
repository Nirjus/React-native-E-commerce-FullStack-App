import { Router } from "express";
import isLogin from "../middleware/islogin.js";
import isAdmin from "../middleware/isAdmin.js";
import {
  createBanner,
  deleteBanner,
  getAllBanner,
} from "../Controller/bannerController.js";
import { singleUpload } from "../middleware/multer.js";

const bannerRoutes = Router();

bannerRoutes.get("/getAll-banner", getAllBanner);

bannerRoutes.post("/create", isLogin, isAdmin, singleUpload, createBanner);

bannerRoutes.delete("/delete/:id", isLogin, isAdmin, deleteBanner);

export default bannerRoutes;
