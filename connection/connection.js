const mongoose = require("mongoose");

const username = process.env.USER;
const password = process.env.PASSWORD;
const clusterName = process.env.CLUSTERNAME;
const dbName = process.env.DBNAME;

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
