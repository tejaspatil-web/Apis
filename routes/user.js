import express from "express";
const router = express.Router();
import {
  addNewUser,
  allUsers,
  singleUser,
  updateUser,
  deleteUser,
} from "../controller/user.controller.js";
import {
  authentication,
  encryptPassword,
} from "../middleware/authentication.js";
import OtpGenerator from "../middleware/otpGenrator.js";
import userLogin from "../authentication/login.js";
import { VerifyOtp, sendOTP } from "../authentication/otp.js";
import { forgotPassword } from "../authentication/forgotpassword.js";

router.post("/login", userLogin);
router.post("/create", encryptPassword, addNewUser);
router.get("/userlist", authentication, allUsers);
router.get("/user/:id", authentication, singleUser);
router.put("/update/:id", authentication, updateUser);
router.delete("/delete/:id", authentication, deleteUser);
router.post("/sendotp", OtpGenerator, sendOTP);
router.post("/verifyotp", VerifyOtp);
router.post("/forgotpassword", OtpGenerator, forgotPassword);
router.post("/otpverification", forgotPassword);

export default router;
