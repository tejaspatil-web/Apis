const cloudinary = require("../configuration/cloudinary");
const ProductModel = require("../model/product.model");



async function getProducts(req, res) {
  try {
    const Products = await ProductModel.find({}, {__v: 0 });
    res.json(Products);
  } catch (err) {
    res.json({ massage: err });
  }
}




async function getSingleProductDetails(req, res) {
  try {
    const productId = req.params.id;
    const foundProduct = await ProductModel.findById(productId,{__v: 0 });
    if (foundProduct) {
      res.status(200).json(foundProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching Product", error: error.message });
  }
}

  async function addNewProduct(req, res) {
    try {
      let imageUrl;
      let imageId;
      const { description, price, details, rating, image,trademark,type } = req.body;
  
      if (image) {
        await cloudinary.uploader.upload(image, (error, result) => {
          if (result) {
            imageUrl = result.url;
            imageId = result.public_id;
          } else if (error) {
            res.sendStatus(401, error);
          }
        });
      }
  
      const newUser = new ProductModel({
        productDescription:description,
        productPrice:price,
        productImage:imageUrl,
        productImageId:imageId,
        productDetails:details,
        productRating:rating,
        productTrademark:trademark,
        productType:type
      });
  
      await newUser.save();
      res.send("Product Saved Successfully");
    } catch (error) {
      res.send(error);
    }
  }

  module.exports = {getProducts,addNewProduct,getSingleProductDetails}