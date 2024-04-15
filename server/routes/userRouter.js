import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import {
  deleteUser,
  getAllUsers,
  getProfile,
  loginController,
  logout,
  processVerify,
  resetPassword,
  updateAvatar,
  updatePassword,
  updateProfile,
  userRegister,
} from "../Controller/userController.js";
import isLogin from "../middleware/islogin.js";
import { singleUpload } from "../middleware/multer.js";
import isAdmin from "../middleware/isAdmin.js";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

const userRoutes = Router();
userRoutes.post("/register", limiter, userRegister);
userRoutes.get("/verify/:token", processVerify);
userRoutes.post("/login", limiter, loginController);

userRoutes.get("/me", isLogin, getProfile);
userRoutes.get("/logout", logout);

userRoutes.put("/update", isLogin, updateProfile);
userRoutes.put("/update-password", isLogin, updatePassword);
userRoutes.put("/update-avatar", isLogin, singleUpload, updateAvatar);

userRoutes.post("/forgot-password", resetPassword);
// ================  Admin Routes =======================
userRoutes.get("/getAll-users", getAllUsers);
userRoutes.delete("/delete/:id", isLogin, isAdmin, deleteUser);
export default userRoutes;
