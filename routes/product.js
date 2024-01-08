import express from "express";
const router = express.Router();
import {
  getProducts,
  addNewProduct,
  getSingleProduct,
} from "../controller/product.controller.js";
import { authentication } from "../middleware/authentication.js";
import FileUploader from "../middleware/multer.js"
const fileUploader = new FileUploader()

router.get("/product/:id", authentication, getSingleProduct);
router.get("/productlist", getProducts);
router.post(
  "/create",authentication,fileUploader.getUploader(),
  addNewProduct
);

export default router;
