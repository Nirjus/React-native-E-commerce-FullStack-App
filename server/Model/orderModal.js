import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      name: {
        type: String,
        required: [true, "Address name is required"],
      },
      city: {
        type: String,
        required: [true, "City is required"],
      },
      state: {
        type: String,
        required: [true, "State is required"],
      },
    },
    orderItems: [
      {
        product: {
          type: Object,
          required: [true, "Product is required"],
        },
        qty: {
          type: Number,
          required: [true, "Quantity is required"],
        },
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "User Id is required"],
    },
    paymentInfo: {
      paymentId: {
        type: String,
        required: ["Payment Id is required"],
      },
      productPrice: {
        type: Number,
        required: [true, "Price of the Product is required"],
      },
      totalAmount: {
        type: Number,
        required: [true, "Total Amount is required"],
      },
      shippingCharges: {
        type: Number,
        required: [true, "Shipping Charges is required"],
      },
      tax: {
        type: Number,
        required: [true, "Tax is required"],
      },
      status: {
        type: String,
        enum: ["Processing", "Shipped", "Deliverd"],
        default: "Processing",
      },
      paymentMode: {
        type: String,
        enum: ["Cash", "Card"],
        default: "Card",
      },
    },
    deliverdAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Orders", orderSchema);

export default Order;
