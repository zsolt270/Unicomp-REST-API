import { body } from "express-validator";

export const newBookValidation = [
  body("title")
    .exists({ values: "falsy" })
    .withMessage("Please enter a book name!")
    .isString()
    .escape(),
  body("author")
    .exists({ values: "falsy" })
    .withMessage("Please enter an author for the book!")
    .isString()
    .escape(),
  body("genre")
    .exists({ values: "falsy" })
    .withMessage("Please enter the books genre!")
    .isString()
    .escape(),
  body("description")
    .exists({ values: "falsy" })
    .withMessage("Please enter the books description!")
    .isLength({ min: 5 })
    .withMessage("The books description must be at least 5 character long!")
    .escape(),
];
