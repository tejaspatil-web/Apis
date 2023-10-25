const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true },
  number: { type: Number, required: false },
  password: { type: String, required: true },
  imageUrl: { type: String, required: false },
  imageId: { type: String, required: false },
});

const forgotPasswordSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  used: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
  },
});

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  used: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
  },
});

const User = mongoose.model("userdetails", userSchema);
const Otp = mongoose.model("otpdetails", otpSchema);
const ForgotPassword = mongoose.model(
  "forgotpassworddetails",
  forgotPasswordSchema
);

module.exports = { User, Otp, ForgotPassword };
