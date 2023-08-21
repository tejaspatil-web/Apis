const dotenv = require('dotenv')
dotenv.config()
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyparser.json({ limit: "10mb" }));
const connection = require("./connection/connection");
const port = process.env.PORT || '3000'

// Default Route
app.get("/", (req, res) => {
  res.send("<h3>Server is Running...</h3>");
});

// This Route Use For Manage User Details
const userRoute = require("./routes/user");
app.use("/api/user", userRoute);

// This Route Use For Manage Product Details
const productRoute = require('./routes/product')
app.use("/api/product", productRoute);

app.listen(port, () => {
  console.log(`Server Running On Port ${port}`);
});
