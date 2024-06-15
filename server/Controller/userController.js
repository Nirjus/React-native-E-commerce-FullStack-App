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

    const token = jwt.sign({ name, password, email }, jwtSecret, {
      expiresIn: "5m",
    });

    const emialData = {
      email,
      subject: "Account Activation Email",
      html: `
         <div style="background-color: #f0f8ff; padding: 40px; border-radius: 10px; font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #cce7ff;">
      <h2 style="color: #003366; text-align: center;">Hello, ${name}!</h2>
      <p style="color: #003366; font-size: 16px; text-align: center;">Thank you for registering with us. Please click the button below to activate your account:</p>
      <div style="text-align: center;">
        <a href="${backendUrl}/api/v1/user/verify/${token}" style="text-decoration: none;">
          <button style="
            background-color: #28a745; 
            color: white; 
            padding: 15px 30px; 
            border: none; 
            border-radius: 5px; 
            font-size: 18px; 
            cursor: pointer; 
            transition: background-color 0.3s ease;
          " 
          onmouseover="this.style.backgroundColor='#218838'"
          onmouseout="this.style.backgroundColor='#28a745'">
            Activate Account
          </button>
        </a>
      </div>
      <p style="color: #003366; font-size: 14px; text-align: center; margin-top: 20px;">If you did not request this, please ignore this email or contact our support team.</p>
      <p style="color: #003366; font-size: 14px; text-align: center; margin-top: 20px;">Best regards,<br>ELearner</p>
    </div>`,
    };

    await sendVerificationEmail(emialData);

    return res.status(201).json({
      success: true,
      message: `Please visit your email: ${email} to activate your account`,
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

    return res.status(201).send(`
      <div style=" text-align: center; margin: 50px;">
         <h1 style=" color: green;"> Success</h1>
         <p>Your account is registerd successfully</p>
      </div>`);
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
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      throw Error("Please provide email and password");
    }
    const user = await User.findOne({ email: email });

    if (!user) {
      throw Error("User not found!");
    }

    const token = jwt.sign({ email, newPassword }, jwtSecret, {
      expiresIn: "5m",
    });

    const emailData = {
      email: user.email,
      subject: "Forgot password ",
      html: `
          <div style="background-color: #e6f7ff; padding: 40px; border-radius: 10px; font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h2 style="color: #003366;">Hello ${user?.name}</h2>
      <p style="color: #003366;">Please click the button below to reset your password:</p>
      <a href="${backendUrl}/api/v1/user/reset-password/${token}" style="text-decoration: none;">
        <button style="background-color: #0059b3; color: white; padding: 10px 20px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">
          Reset Password
        </button>
      </a>
      <p style="color: #003366;">If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
    </div>
      `,
    };

    await sendVerificationEmail(emailData);
    return res.status(201).json({
      success: true,
      message: `Check your email: ${user.email} to reset your password.`,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyForgetPasswordEmail = async (req, res, next) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).send(`
        <div style="text-align: center; margin: 50px;">
          <h1 style="color: red;">Error</h1>
          <p>Token not found</p>
        </div>
        `);
    }
    const decoded = jwt.verify(token, jwtSecret);

    if (!decoded) {
      return res.status(400).send(`
        <div style="text-align: center; margin: 50px;">
          <h1 style="color: red;">Error</h1>
          <p>Token expired</p>
        </div>
      `);
    }
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(400).send(`
        <div style="text-align: center; margin: 50px;">
          <h1 style="color: red;">Error</h1>
          <p>User not exists with this email</p>
        </div>
      `);
    }
    user.password = decoded.newPassword;

    await user.save();

    return res.status(200).send(`
          <div style="text-align: center; margin: 50px;">
          <h1 style="color: green;">Success</h1>
          <p>Password successfully reset</p>
        </div>
      `);
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
