import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "user email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      select: false,
      required: [true, "user password is required"],
      trim: true,
      maxlength: [30, "Password length must be under 30 characters"],
      minlength: [6, "Password must contain at least 6 characters"],
    },
    address: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
    contact: {
      type: Number,
    },
    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

// hasing the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 10);
});

userSchema.method("comparePassword", async function (plainPassword) {
  return await bcryptjs.compare(plainPassword, this.password);
});
const User = mongoose.model("Users", userSchema);

export default User;
