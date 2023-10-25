const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

const dotenv = require("dotenv");
dotenv.config();

//This Is Use For MongoDB Atlas Connection
require("./connection/connection");

const port = process.env.PORT || "3000";
const path = require("path");

// Default Route
app.get("/", (req, res) => {
  res.sendFile(path.join(`${__dirname}/view/index/index.html`));
});

// This Route Use For Manage User Details
const userRoute = require("./routes/user");
app.use("/api/user", userRoute);

// This Route Use For Manage Product Details
const productRoute = require("./routes/product");
app.use("/api/product", productRoute);

// This Route Use For If There Is No Route Found
app.use("*/", (req, res) => {
  res.status(404).send("404 Page Not Found");
});

app.listen(port, () => {
  console.log(`Server Running On Port ${port}`);
});
