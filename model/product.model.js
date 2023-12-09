import { mongoose } from "mongoose";

const productSchema = new mongoose.Schema({
  productDescription: { type: String, required: true },
  productImage: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productDetails: { type: Object, required: false },
  productRating: { type: String, required: false },
  productImageId: { type: String, required: false },
  productTrademark: { type: String, required: true },
  productType: { type: String, required: true },
});

const Product = mongoose.model("productdetails", productSchema);

export default Product;
