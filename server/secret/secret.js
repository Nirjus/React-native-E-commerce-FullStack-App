import dotenv from "dotenv";

dotenv.config({
  path: "./secret/.env",
});

export const port = process.env.PORT || "8001";

export const mongoUri =
  process.env.MONGO_URI || "mongodb://localhost:27017/eCommerce";

export const jwtSecret = process.env.JWT_SECRET || "GHkgfy65%#44%35";

export const nodeEnv = process.env.NODE_ENV || "";

export const cloudinaryName = process.env.CLOUDINARY_NAME || "";

export const cludinaryApiKey = process.env.CLOUDINARY_API_KEY || "";

export const cludinaryApiSecret = process.env.CLOUDINARY_API_SECRET || "";

export const smtpPassword = process.env.SMTP_PASSWORD || "";

export const smtpUserName = process.env.SMTP_USERNAME || "";

export const backendUrl = process.env.BACKEND_URL || "";
