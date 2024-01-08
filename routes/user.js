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
import { forgotPassword ,otpverification,updatepassword} from "../authentication/forgotpassword.js";
import FileUploader from "../middleware/multer.js"
const fileUploader = new FileUploader()

router.post("/login", userLogin);
router.post("/create", encryptPassword, fileUploader.getUploader(),addNewUser);
router.get("/userlist", authentication, allUsers);
router.get("/user/:id", authentication, singleUser);
router.put("/update/:id", authentication, fileUploader.getUploader(),updateUser);
router.delete("/delete/:id", authentication, deleteUser);
router.post("/sendotp", OtpGenerator, sendOTP);
router.post("/verifyotp", VerifyOtp);
router.post("/forgotpassword", OtpGenerator, forgotPassword);
router.post("/otpverification", otpverification);
router.post("/updatepassword", encryptPassword,updatepassword);

export default router;
