const mongoose = require("mongoose");

const username = "tejas";
const password = "tejas5727";
const clusterName = "cluster0";
const dbName = "DATABASE";

const connectionString = `mongodb+srv://${username}:${password}@${clusterName}.at0piue.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const connection = mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

module.exports = connection;
