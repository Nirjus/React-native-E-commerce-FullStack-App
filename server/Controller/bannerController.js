import cloudinary from "cloudinary";
import Banner from "../Model/bannerModal.js";
import { getDataUri } from "../utils/features.js";

export const getAllBanner = async (req, res, next) => {
  try {
    const banners = await Banner.find({});

    return res.status(201).json({
      success: true,
      banners,
    });
  } catch (error) {
    next(error);
  }
};

export const createBanner = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw Error("Name is required");
    }
    if (!req.file) {
      throw Error("Banner image is required");
    }
    const file = getDataUri(req.file);

    const myCloude = await cloudinary.v2.uploader.upload(file.content, {
      folder: "React-native-ecom",
    });
    const image = {
      public_id: myCloude.public_id,
      url: myCloude.secure_url,
    };
    const banner = await Banner.create({
      name: name,
      bannerImage: image,
    });

    return res.status(201).json({
      success: true,
      message: "Banner created successfully",
      banner,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBanner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findById(id);

    if (!banner) {
      throw Error("Banner not found");
    }
    await cloudinary.v2.uploader.destroy(banner.bannerImage.public_id);

    await banner.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
