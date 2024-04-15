import cloudinary from "cloudinary";
import Product from "../Model/productModal.js";
import { getDataUri } from "../utils/features.js";

export const getAllProducts = async (req, res, next) => {
  const { keyword, category } = req.query;
  try {
    const products = await Product.find({
      name: {
        $regex: keyword ? keyword : "",
        $options: "i",
      },
      category: {
        $regex: category ? category : "",
        $options: "i",
      },
    }).sort({ createdAt: -1 });

    return res.status(201).json({
      success: true,
      message: "All Products are return successfull",
      products,
    });
  } catch (error) {
    next(error);
  }
};

export const getTopProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(10);

    return res.status(201).json({
      success: true,
      message: "Top 10 Products",
      products,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      throw Error("Product not found!");
    }

    return res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock, offer, category } = req.body;

    if (!name || !description || !price || !stock || !offer || !category) {
      throw Error("Please provide all information");
    }
    if (!req.file) {
      throw Error("Please Provide Product Images");
    }
    const file = getDataUri(req.file);
    const myClode = await cloudinary.v2.uploader.upload(file.content, {
      folder: "React-native-ecom",
    });

    const image = {
      public_id: myClode.public_id,
      url: myClode.secure_url,
    };

    const product = await Product.create({
      name: name,
      description: description,
      price: price,
      stock: stock,
      category: category,
      offer: offer,
      images: [image],
    });

    return res.status(201).json({
      success: true,
      message: "Product Created successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      throw Error("Product not found with this Id");
    }
    const { name, description, price, stock, offer, category } = req.body;

    if (name) {
      product.name = name;
    }
    if (description) {
      product.description = description;
    }
    if (price) {
      product.price = price;
    }
    if (stock) {
      product.stock = stock;
    }
    if (offer) {
      product.offer = offer;
    }
    if (category) {
      product.category = category;
    }

    await product.save();

    return res.status(201).json({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    next(error);
  }
};
export const addProductImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      throw Error("Product not found");
    }
    if (!req.file) {
      throw Error("Please provide product image");
    }

    const file = getDataUri(req.file);

    const myCloude = await cloudinary.v2.uploader.upload(file.content, {
      folder: "React-native-ecom",
    });

    const image = {
      public_id: myCloude.public_id,
      url: myCloude.secure_url,
    };

    product.images.push(image);

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product Image added",
      product,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    next(error);
  }
};
export const updateProductImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { imageId } = req.query;

    const product = await Product.findById(id);

    if (!product) {
      throw Error("Product not found");
    }
    if (!req.file) {
      throw Error("Please provide product image");
    }
    if (!imageId) {
      throw Error("Image Id not found");
    }
    const file = getDataUri(req.file);
    let isExist = -1;
    product.images.forEach((img, index) => {
      if (img._id.toString() === imageId.toString()) {
        isExist = index;
      }
    });
    await cloudinary.v2.uploader.destroy(product.images[isExist].public_id);

    const myCloude = await cloudinary.v2.uploader.upload(file.content, {
      folder: "React-native-ecom",
    });
    product.images[isExist] = {
      public_id: myCloude.public_id,
      url: myCloude.secure_url,
    };
    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product Image updated",
      product,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    next(error);
  }
};
export const deleteProductImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { imageId } = req.query;

    const product = await Product.findById(id);

    if (!product) {
      throw Error("Product not found");
    }
    if (!imageId) {
      throw Error("Image Id not found");
    }
    if (product.images.length === 1) {
      throw Error(
        "You can not delete all images, your product must have atleast one image"
      );
    }
    let isExist = -1;
    product.images.forEach((img, index) => {
      if (img._id.toString() === imageId.toString()) {
        isExist = index;
      }
    });
    if (isExist < 0) {
      throw Error("Image not deleted, tri again");
    }

    await cloudinary.v2.uploader.destroy(product.images[isExist].public_id);
    product.images.splice(isExist, 1);
    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product Image deleted",
      product,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      throw Error("Product not found!");
    }
    for (let index = 0; index < product.images.length; index++) {
      await cloudinary.v2.uploader.destroy(product.images[index].public_id);
    }
    await product.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const createReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { comment, rating } = req.body;
    const user = req.user;
    const product = await Product.findById(id);
    if (!product) {
      throw Error("Product not found!");
    }
    // check alrady reviewd or not
    const reviewExists = product.reviews.find(
      (r) => r.user.toString() === user._id.toString()
    );
    if (reviewExists) {
      return res.status(400).send({
        success: false,
        message: "Product already Reviewed",
      });
    }
    const review = {
      name: user.name,
      rating: Number(rating),
      comment: comment,
      user: user._id,
    };
    //passing review object to review array
    product.reviews.push(review);
    // number of rating
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    // save
    await product.save();

    return res.status(201).json({
      success: true,
      message: "Review Added",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    next(error);
  }
};
