import jwt from "jsonwebtoken";
import { jwtSecret } from "../secret/secret.js";
import User from "../Model/userModel.js";

const isLogin = async (req, res, next) => {
  try {
    // const { token } = req.cookies;  // this is for api testing

    const token = req.header("Authorization");

    if (!token) {
      throw Error("Jwt token not found");
    }
    const decoded = jwt.verify(token, jwtSecret);

    const user = await User.findById(decoded.id);
    if (!user) {
      throw Error("User not found!");
    }
    req.user = user;

    return next();
  } catch (error) {
    next(error);
  }
};

export default isLogin;
