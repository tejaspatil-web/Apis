import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { createRequire } from "module";
const requireType = createRequire(import.meta.url)
const app = express();
app.use(helmet())
// Dot env Configuration
dotenv.config();
app.use(bodyParser.json({ limit: "10mb" }));
const swaggerJson = requireType('./swagger/swagger-output.json')
import swaggerUi from "swagger-ui-express";
const port = process.env.PORT || "3000";
// User Rote
import userRoute from "./routes/user.js";
// Product Rote
import productRoute from "./routes/product.js";
import { connection } from "./connection/connection.js";
import  configureCloudinary  from "./configuration/cloudinary.js";
// DB Connection
const dbConnection = new connection();
dbConnection.dbConnection();

// Cloudinary Configuration
configureCloudinary()

// Check if the environment is set to development
const npmLifecycleEvent = process.env.npm_lifecycle_event
console.log(npmLifecycleEvent)
if (npmLifecycleEvent === 'dev') {
  app.use(cors({origin:[process.env.DEVURL]}));
// This Route Use For Swagger Docs
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));
}else{
  app.use(cors({origin:[process.env.PRODURL]}));
}

// Default Route
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, 'view', 'index', 'index.html'));
});

// This Route Use For Manage User Details
app.use("/api/user", userRoute);

// This Route Use For Manage Product Details
app.use("/api/product", productRoute);

  // This Route Use For If There Is No Route Found
  app.use("*/", (req, res) => {
    res.status(404).send("404 Page Not Found");
  });

app.listen(port, () => {
  console.log(`Server Running On Port ${port}`);
});
