import { mongoose } from "mongoose";

  // Function to format date as DD-MM-YYYY
  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  
  // Function to format time in 12-hour format with AM/PM
  function format12HourTime(date) {
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHours}:${minutes} ${amOrPm}`;
  }  

const productSchema = new mongoose.Schema({
  productDescription: { type: String, required: true },
  productImage: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productDetails: { type: Object, required: false },
  productRating: { type: String, required: false },
  productImageId: { type: String, required: false },
  productTrademark: { type: String, required: true },
  productType: { type: String, required: true },
  createdDate: {
    type: String,
    default: () => formatDate(new Date())
  },
  createdTime: {
    type: String,
    default: () => format12HourTime(new Date())
  }
});

const Product = mongoose.model("productdetails", productSchema);

export default Product;