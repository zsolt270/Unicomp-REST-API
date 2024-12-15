import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConnection.js";
import usersRouter from "./routes/usersRoute.js";
import booksRouter from "./routes/booksRoute.js";
import errorHandler from "./middleware/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
const swaggerDoc = YAML.load("./swagger.yaml");

dotenv.config();
connectDB();
const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use("/users", usersRouter);

app.use("/books", booksRouter);

app.use("*", (req, res) => {
  res.json({ message: "Route was not found" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`The server is listening on ${PORT}`);
});
