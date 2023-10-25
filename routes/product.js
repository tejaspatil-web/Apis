const router = require("express").Router();
const userController = require("../controller/product.controller");
const auth = require("../middleware/authentication");

router.get("/productlist", userController.getProducts);
router.post("/create", auth.authentication, userController.addNewProduct);

module.exports = router;
