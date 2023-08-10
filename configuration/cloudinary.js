const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "tejaspatil-web",
  api_key: "951471884173339",
  api_secret: "tDmdXak1hjwD_KSY8VcQvlqiXjM",
});

module.exports = cloudinary;
