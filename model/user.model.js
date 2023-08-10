const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type:String, required:false },
  email: { type:String, required:true },
  number: { type:Number, required:false },
  password: { type:String, required:true },
  imageUrl: { type:String, required:false },
  imageId: { type:String, required:false },
});

const otpSchema = new mongoose.Schema({
  email:  { type:String, required:true },
  otp:  { type:Number, required:true },
  used:Boolean
});

const User = mongoose.model("userdetails", userSchema);
const Otp = mongoose.model("otpdetails", otpSchema);

module.exports = { User, Otp };
