import mongoose from "mongoose";

// review Schema
const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    rating: {
      type: Number,
      default: 0,
    },
    comment: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "user is required"],
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    description: {
      type: String,
      required: [true, "Product Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Product Price is required"],
    },
    stock: {
      type: Number,
      required: [true, "Product Stock is required"],
    },
    rating: {
      type: Number,
      default: 0,
    },
    offer: {
      type: Number,
    },
    category: {
      type: String,
      required: [true, "Produtct category is required"],
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

const Product = mongoose.model("Products", productSchema);

export default Product;
