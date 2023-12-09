import express from "express";
const router = express.Router();
import {
  getProducts,
  addNewProduct,
} from "../controller/product.controller.js";
import { authentication } from "../middleware/authentication.js";

router.get("/productlist", getProducts);
router.post("/create", authentication, addNewProduct);

export default router;
