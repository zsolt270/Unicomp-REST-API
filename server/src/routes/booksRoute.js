import { Router } from "express";
import asyncHandler from "express-async-handler";
import {
  newBookValidation,
  updateBookValidation,
} from "../controllers/validationSchemas/booksValidationSchema.js";
import { requestValidator } from "../middleware/requestValidator.js";
import Book from "../controllers/booksController.js";
// import User from "../controllers/usersController";
// import Review from "../controllers/reviewsController";

const booksRouter = Router();
const book = new Book();

//Books specific routes
booksRouter.get("/", asyncHandler(book.getBooks));

booksRouter.get("/:id", asyncHandler(book.getBookById));

booksRouter.post("/", newBookValidation, requestValidator, asyncHandler(book.createBook));

booksRouter.patch("/:id", updateBookValidation, requestValidator, asyncHandler(book.updateBook));

booksRouter.delete("/:id", asyncHandler(book.deleteBook));

//Book reviews specific routes
booksRouter.get("/:bookId/reviews", asyncHandler());

booksRouter.post("/:bookId/reviews", asyncHandler());

booksRouter.patch("/reviews/:id", asyncHandler());

booksRouter.delete("/reviews/:id", asyncHandler());

export default booksRouter;
