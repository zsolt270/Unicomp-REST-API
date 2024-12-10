import { Router } from "express";
import asyncHandler from "express-async-handler";
// import User from "../controllers/usersController";
// import Book from "../controllers/booksController";
// import Review from "../controllers/reviewsController";

const booksRouter = Router();

//Books specific routes
booksRouter.get("/", asyncHandler());

booksRouter.get("/:id", asyncHandler());

booksRouter.post("/", asyncHandler());

booksRouter.patch("/:id", asyncHandler());

booksRouter.delete("/:id", asyncHandler());

//Book reviews specific routes
booksRouter.get("/:bookId/reviews", asyncHandler());

booksRouter.post("/:bookId/reviews", asyncHandler());

booksRouter.patch("/reviews/:id", asyncHandler());

booksRouter.delete("/reviews/:id", asyncHandler());

export default booksRouter;
