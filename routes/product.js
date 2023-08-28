const router = require("express").Router();
const userController = require("../controller/product.controller");

router.get("/productlist", userController.getProducts);
router.get("/product/:id", userController.getSingleProductDetails);
router.post("/create", userController.addNewProduct);

module.exports = router;