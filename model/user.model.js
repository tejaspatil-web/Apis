import mongoose from "mongoose";

  // Function to format date as DD-MM-YYYY
  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  
  // Function to format time in 12-hour format with AM/PM
  function format12HourTime(date) {
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHours}:${minutes} ${amOrPm}`;
  }  

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: Number, required: true },
  password: { type: String, required: true },
  imageUrl: { type: String, required: false },
  imageId: { type: String, required: false },
  createdDate: {
    type: String,
    default: () => formatDate(new Date())
  },
  createdTime: {
    type: String,
    default: () => format12HourTime(new Date())
  }
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
const UserForgotPassword = mongoose.model(
  "forgotpassworddetails",
  forgotPasswordSchema
);

export { User, Otp, UserForgotPassword };
