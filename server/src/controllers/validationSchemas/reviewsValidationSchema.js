import { body } from "express-validator";

export const newReviewValidation = [
  body("rating")
    .exists({ values: "falsy" })
    .withMessage("Please give a rating out of 5!")
    .isNumeric()
    .escape(),
  body("reviewtext")
    .exists({ values: "falsy" })
    .withMessage("Please write a review!")
    .isString()
    .isLength({ min: 10 })
    .withMessage("The review must be at least 10 character long!")
    .escape(),
];
