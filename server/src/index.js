import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConnection.js";
import usersRouter from "./routes/usersRoute.js";
import booksRouter from "./routes/booksRoute.js";

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());

app.use("/users", usersRouter);

app.use("/books", booksRouter);

app.use("*", (req, res) => {
  res.json({ message: "Route was not found" });
});

app.listen(PORT, () => {
  console.log(`The server is listening on ${PORT}`);
});
