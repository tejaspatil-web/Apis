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

const userRoute = require("./routes/user");
app.use("/api/user", userRoute);

app.listen(port, () => {
  console.log(`Server Running On Port ${port}`);
});
