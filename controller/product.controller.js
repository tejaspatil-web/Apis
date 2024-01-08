import Product from "../model/product.model.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // Import the File System module

async function getProducts(req, res) {
  try {
    const Products = await Product.find({}, { __v: 0 ,createdDate:0,createdTime:0});
    res.json(Products);
  } catch (error) {
    res.json({ message: error });
  }
}

async function getSingleProduct(req, res) {
  try {
    const productId = req.params.id;
    const foundProduct = await Product.findById(productId, {
      password: 0,
      __v: 0,
    });
    if (foundProduct) {
      res.status(200).json(foundProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
}

async function addNewProduct(req, res) {
  try {
    let imageUrl;
    let imageId;
    const { description, price, details, rating, trademark, type } =
      JSON.parse(req.body.data)
      const image = req.file.path
    if (image) {
      await cloudinary.uploader.upload(image, (error, result) => {
        if (result) {
          imageUrl = result.url;
          imageId = result.public_id;
          deleteLocalImage(image);
        } else if (error) {
          res.sendStatus(400, error);
        }
      });
    }

    const newProduct = new Product({
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
    res.status(200).json({message:"Product Saved Successfully"});
  } catch (error) {
    res.status(400).json(error);
  }
}

// Function to delete the image from the local path
function deleteLocalImage(path) {
  fs.unlink(path, (err) => {
    if (err) {
      console.error("Error deleting the file:", err);
    } else {
      console.log("File deleted successfully");
    }
  });
}

export { getSingleProduct,getProducts, addNewProduct };
