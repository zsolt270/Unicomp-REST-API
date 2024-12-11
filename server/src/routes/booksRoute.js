import { Router } from "express";
import asyncHandler from "express-async-handler";
import jwtAuthenticator from "../middleware/jwtAuthenticater.js";
import {
  newBookValidation,
  updateBookValidation,
} from "../controllers/validationSchemas/booksValidationSchema.js";
import {
  newReviewValidation,
  updateReviewValidation,
} from "../controllers/validationSchemas/reviewsValidationSchema.js";
import { requestValidator } from "../middleware/requestValidator.js";
import Book from "../controllers/booksController.js";
import Review from "../controllers/reviewsController.js";

const booksRouter = Router();
const book = new Book();
const review = new Review();

//Books specific routes
booksRouter.get("/", asyncHandler(book.getBooks));

booksRouter.get("/:id", asyncHandler(book.getBookById));

booksRouter.post("/", newBookValidation, requestValidator, asyncHandler(book.createBook));

booksRouter.patch("/:id", updateBookValidation, requestValidator, asyncHandler(book.updateBook));

booksRouter.delete("/:id", asyncHandler(book.deleteBook));

//Book reviews specific routes
booksRouter.get("/:bookId/reviews", asyncHandler(review.getBookReviews));

booksRouter.post(
  "/:bookId/reviews",
  jwtAuthenticator,
  newReviewValidation,
  requestValidator,
  asyncHandler(review.newReview)
);

booksRouter.patch(
  "/reviews/:id",
  jwtAuthenticator,
  updateReviewValidation,
  requestValidator,
  asyncHandler()
);

booksRouter.delete("/reviews/:id", jwtAuthenticator, asyncHandler());

export default booksRouter;
