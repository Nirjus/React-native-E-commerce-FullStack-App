import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "address name is required"],
      unique: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
    },
    street: {
      type: String,
      required: [true, "street is required"],
    },
    landmark: {
      type: String,
      required: [true, "Landmark is required"],
    },
    pincode: {
      type: Number,
      required: [true, "Pincode is required"],
    },
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);

export default Address;
