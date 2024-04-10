import Address from "../Model/addressModal.js";
import User from "../Model/userModel.js";

export const getAllAddress = async (req, res, next) => {
  try {
    const addresses = await Address.find({});

    return res.status(201).json({
      success: true,
      addresses,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyAddress = async (req, res, next) => {
  try {
    const user = req.user;

    const getUser = await User.findById(user.id);
    let addressArray = [];
    if (getUser.address.length === 0) {
      throw Error("Dont have any save addresses, create one");
    }
    for (let i = 0; i < getUser.address.length; i++) {
      const address = await Address.findById(getUser.address[i]._id);
      addressArray.push(address);
    }

    return res.status(201).json({
      success: true,
      message: "Address are return successfully",
      addressArray,
    });
  } catch (error) {
    next(error);
  }
};

export const createAddress = async (req, res, next) => {
  try {
    const user = req.user;
    const { name, city, state, street, landmark, pincode } = req.body;
    if (!name || !city || !state || !street || !landmark || !pincode) {
      throw Error("plase fill all fields");
    }
    const address = await Address.create({
      name: name,
      city: city,
      state: state,
      street: street,
      landmark: landmark,
      pincode: pincode,
    });

    const getUser = await User.findById(user.id);
    if (!getUser) {
      throw Error("unanle to find user to add address");
    }
    getUser.address.push(address._id);

    await getUser.save();

    return res.status(201).json({
      success: true,
      message: `Address created successfully`,
      address,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, city, state, street, landmark, pincode } = req.body;
    const address = await Address.findById(id);

    if (!address) {
      throw Error("Address not found!");
    }
    if (name) {
      address.name = name;
    }
    if (city) {
      address.city = city;
    }
    if (state) {
      address.state = state;
    }
    if (street) {
      address.street = street;
    }
    if (landmark) {
      address.landmark = landmark;
    }
    if (pincode) {
      address.pincode = pincode;
    }

    await address.save();

    return res.status(200).json({
      success: true,
      message: `Address updated successfully`,
      address,
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

export const deleteAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const address = await Address.findById(id);

    if (!address) {
      throw Error("Address not found!");
    }
    const getUser = await User.findById(user.id);
    let isExists = -1;
    getUser.address.forEach((item, index) => {
      if (item._id.toString() === address.id.toString()) {
        isExists = index;
      }
    });
    if (isExists < 0) {
      throw Error("Address not exists for this user");
    }
    getUser.address.splice(isExists, 1);
    await getUser.save();

    await address.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Address deleted successfully",
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
