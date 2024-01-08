import { v2 as cloudinary } from "cloudinary";

function cloudinaryConfig() {
  const cloud_name = process.env.COLUDNAME;
  const api_key = process.env.APIKEY;
  const api_secret = process.env.API_SECRET;


  return  cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret,
  });
}

export default cloudinaryConfig;
