import colors from "colors";
import cloudinary from "cloudinary";
import App from "./App.js";
import {
  cloudinaryName,
  port,
  cludinaryApiKey,
  cludinaryApiSecret,
} from "./secret/secret.js";
import connectDB from "./config/db.js";

cloudinary.v2.config({
  cloud_name: cloudinaryName,
  api_key: cludinaryApiKey,
  api_secret: cludinaryApiSecret,
});

App.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`.bgMagenta);
  await connectDB();
});
