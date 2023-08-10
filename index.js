const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyparser.json({ limit: "10mb" }));
const connection = require("./connection/connection");

const userRoute = require("./routes/user");
app.use("/api/user", userRoute);

app.listen(3000, () => {
  console.log("Server Running On Port 3000");
});
