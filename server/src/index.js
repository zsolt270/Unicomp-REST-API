import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`The server is listening on ${PORT}`);
});
