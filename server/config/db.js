import mongoose from "mongoose";
import { mongoUri } from "../secret/secret.js";

const connectDB = async () => {
  try {
    await mongoose
      .connect(mongoUri)
      .then(() => {
        console.log(
          `Database is connected ${mongoose.connection.host}`.bgGreen
        );
      })
      .catch((error) => {
        console.log("MongoDB connection error", error);
      });
  } catch (error) {
    console.log("MongoDb error", error);
  }
};

export default connectDB;
