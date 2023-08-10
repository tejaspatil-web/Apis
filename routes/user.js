const router = require("express").Router();
const userController = require("../controller/user.controller");
const auth = require("../middleware/authentication");
const otpGenrator = require("../middleware/otpGenrator");
const userLogin = require("../authentication/login");
const userOtp = require("../authentication/otp");

// This Function Use For Authentication
function authenticateToken(req, res, next) {
  auth.authentication(req, res, next);
}

// This Function Use For EncryptPassword
function encryptPassword(req, res, next) {
  auth.encryptPassword(req, res, next);
}

router.post("/login", userLogin);
router.post("/create", encryptPassword, userController.addNewUser);
router.get("/userlist", authenticateToken, userController.allUsers);
router.get("/user/:id", authenticateToken, userController.singleUser);
router.put("/update/:id", authenticateToken, userController.updateUser);
router.delete("/delete/:id", authenticateToken, userController.deleteUser);
router.post("/sendotp",otpGenrator, userOtp.sendOTP);
router.post("/verifyotp", userOtp.VerifyOtp);

module.exports = router;
