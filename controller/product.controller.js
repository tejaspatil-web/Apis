const cloudinary = require("../configuration/cloudinary");
const ProductModel = require("../model/product.model");

async function getProducts(req, res) {
  try {
    const Products = await ProductModel.find({}, { __v: 0 });
    res.json(Products);
  } catch (err) {
    res.json({ massage: err });
  }
}


async function getProductById(req,res){
  try{
    const productId = req.params.id;
    const isFoundproduct = await ProductModel.findById(productId, {
      __v: 0,
    });
    if (isFoundproduct) {
      res.status(200).json(isFoundproduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error){
    res.json({massage:error})
  }
}


async function addNewProduct(req, res) {
  try {
    let imageUrl;
    let imageId;
    const { description, price, details, rating, image, trademark, type } =
      req.body;

    if (image) {
      await cloudinary.uploader.upload(image, (error, result) => {
        if (result) {
          imageUrl = result.url;
          imageId = result.public_id;
        } else if (error) {
          res.sendStatus(400, error);
        }
      });
    }

    const newProduct = new ProductModel({
      productDescription: description,
      productPrice: price,
      productImage: imageUrl,
      productImageId: imageId,
      productDetails: details,
      productRating: rating,
      productTrademark: trademark,
      productType: type,
    });

    await newProduct.save();
    res.send("Product Saved Successfully");
  } catch (error) {
    res.sendStatus(400, error);
  }
}

module.exports = { getProducts, addNewProduct ,getProductById};
