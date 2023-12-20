import Product from "../model/product.model.js";
import cloudinary from "../configuration/cloudinary.js";

async function getProducts(req, res) {
  try {
    const Products = await Product.find({}, { __v: 0 });
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
    res.send("Product Saved Successfully");
  } catch (error) {
    res.sendStatus(400, error);
  }
}

export { getSingleProduct,getProducts, addNewProduct };
