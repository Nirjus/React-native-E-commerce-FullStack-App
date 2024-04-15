import cloudinary from "cloudinary";
import jwt from "jsonwebtoken";
import User from "../Model/userModel.js";
import { createJWT } from "../config/TokenGeneration.js";
import { backendUrl, jwtSecret, nodeEnv } from "../secret/secret.js";
import { getDataUri } from "../utils/features.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";

export const userRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      throw Error("Name is required");
    }
    if (!email) {
      throw Error("Email is required");
    }
    if (!password) {
      throw Error("Password is required");
    }

    const user = await User.exists({ email: email });
    if (user) {
      throw Error("user already exists with this email");
    }

    const token = createJWT({ name, password, email }, jwtSecret, "10m");

    const emialData = {
      email,
      subject: "Account Activation Email",
      html: `
         <h2> Hello ${name} </h2>
         <p>Please click here to activate <a href="${backendUrl}/api/v1/user/verify/${token}" target="blank">click</a> your account </p>
      `,
    };

    await sendVerificationEmail(emialData);

    return res.status(201).json({
      success: true,
      message: `Please visit your email:${email} to activate your account`,
    });
  } catch (error) {
    next(error);
  }
};

export const processVerify = async (req, res, next) => {
  try {
    const { token } = req.params;

    if (!token) {
      throw Error("Token not found");
    }
    const decoded = jwt.verify(token, jwtSecret);

    if (!decoded) {
      throw Error("Unable to register user");
    }
    const userExists = await User.exists({ email: decoded.email });

    if (userExists) {
      throw Error("User already exists with this email");
    }
    await User.create({
      email: decoded.email,
      password: decoded.password,
      name: decoded.name,
    });

    return res.status(201).send({
      success: true,
      message: "User registered successfull",
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email) {
      throw Error("Email is required");
    }
    if (!password) {
      throw Error("Password is required");
    }
    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      throw Error("User not found");
    }
    const passwordMatch = await user.comparePassword(password);

    if (!passwordMatch) {
      throw Error("Invalid credentials");
    }

    const token = createJWT({ id: user.id }, jwtSecret, "3d");

    // res.cookie("token", token, {
    //   expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    //   maxAge: 3 * 24 * 60 * 60 * 1000, // 3day
    //   httpOnly: nodeEnv === "development" ? true : false, // this option is only true in production
    //   secure: nodeEnv === "development" ? true : false, // this option is only true in production
    //   sameSite: "none",
    // });

    user.password = undefined;

    return res.status(201).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = req.user;

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: nodeEnv === "development" ? true : false, // this option is only true in production
      secure: nodeEnv === "development" ? true : false, // this option is only true in production
      sameSite: "none",
    });

    res.status(201).json({
      success: true,
      message: "Logout Successful",
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const user = req.user;
    const { name, contact } = req.body;

    const updatedUser = {};

    if (name) {
      updatedUser.name = name;
    }
    if (contact) {
      updatedUser.contact = contact;
    }

    const updatedProfile = await User.findByIdAndUpdate(user.id, updatedUser, {
      new: true,
    });

    return res.status(201).json({
      success: true,
      message: "User updated successful",
      user: updatedProfile,
    });
  } catch (error) {
    next(error);
  }
};
export const updatePassword = async (req, res, next) => {
  try {
    const user = req.user;
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword) {
      throw Error("Please provide Old Password");
    }
    if (!newPassword) {
      throw Error("Plase provide New Password");
    }

    const getUser = await User.findById(user.id).select("+password");

    const isMatched = await getUser.comparePassword(oldPassword);
    if (!isMatched) {
      throw Error("Old Password not matched");
    }
    getUser.password = newPassword;

    await getUser.save();

    return res.status(201).json({
      success: true,
      message: "User Password updated successful",
      user: getUser,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req, res, next) => {
  try {
    const getUser = req.user;
    const user = await User.findById(getUser.id);

    const file = getDataUri(req.file);

    if (user.avatar.public_id) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    }
    const myCloude = await cloudinary.v2.uploader.upload(file.content, {
      folder: "React-native-ecom",
    });
    user.avatar = {
      public_id: myCloude.public_id,
      url: myCloude.secure_url,
    };

    await user.save();

    return res.status(201).json({
      success: true,
      message: "User Avatar updated successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { email, newPassword, answer } = req.body;

    if (!email || !newPassword || !answer) {
      throw Error("Please provide all fields");
    }
    const user = await User.findOne({ email: email, answer: answer });

    if (!user) {
      throw Error("User not found!");
    }
    user.password = newPassword;
    await user.save();
    return res.status(201).json({
      success: true,
      message: "Password reset successfull",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    res.status(201).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      throw Error("User not found with this id");
    }
    if (user.role === "Admin") {
      throw Error("User is Admin so user is not removable");
    }
    if (user.avatar.public_id) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    }

    await user.deleteOne();

    res.status(201).json({
      success: true,
      message: "user deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
