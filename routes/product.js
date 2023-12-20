import express from "express";
const router = express.Router();
import {
  getProducts,
  addNewProduct,
  getSingleProduct
} from "../controller/product.controller.js";
import { authentication } from "../middleware/authentication.js";

router.get("/product/:id",authentication,getSingleProduct)
router.get("/productlist", getProducts);
router.post("/create", authentication, addNewProduct);

export default router;
