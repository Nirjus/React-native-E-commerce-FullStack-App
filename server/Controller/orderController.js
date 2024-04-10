import Order from "../Model/orderModal.js";
import Product from "../Model/productModal.js";

export const createOrder = async (req, res, next) => {
  try {
    const { shippingInfo, orderItems, paymentInfo } = req.body;

    const user = req.user;

    if (!shippingInfo || !orderItems || !paymentInfo) {
      throw Error("Please provide all items");
    }

    const order = await Order.create({
      orderItems: orderItems,
      paymentInfo: paymentInfo,
      shippingInfo: shippingInfo,
      userId: user._id,
    });
    // update stock

    for (let i = 0; i < orderItems.length; i++) {
      // find product
      const product = await Product.findById(orderItems[i].product._id);

      product.stock -= orderItems[i].qty;

      await product.save();
    }

    return res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyAllOrders = async (req, res, next) => {
  try {
    const user = req.user;

    const orders = await Order.find({
      userId: user.id,
    });

    if (!orders) {
      throw Error("No orders found with this User Id");
    }

    return res.status(201).json({
      success: true,
      message: "Order Return successfully",
      totalOrder: orders.length,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleOrderDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      throw Error("No order found!");
    }

    return res.status(201).json({
      success: true,
      message: "your order found",
      order,
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

//  ================  Admin Controller =================

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({});

    return res.status(201).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

export const changeOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      throw Error("No Order found!");
    }
    if (order.paymentInfo.status === "Processing") {
      order.paymentInfo.status = "Shipped";
    } else if (order.paymentInfo.status === "Shipped") {
      order.paymentInfo.status = "Deliverd";
      order.deliverdAt = Date.now();
    } else {
      return res.status(500).send({
        success: false,
        message: "order already delivered",
      });
    }

    await order.save();

    return res.status(201).send({
      success: true,
      message: "Order status updated successfully",
      order,
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
