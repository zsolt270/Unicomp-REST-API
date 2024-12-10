import { body } from "express-validator";

export const signUpValidation = [
  body("username")
    .exists()
    .withMessage("Please enter a username!")
    .isString()
    .isLength({ min: 5 })
    .withMessage("The username must be 5 character long!")
    .escape(),
  body("email")
    .exists()
    .withMessage("PLease enter a username!")
    .isString()
    .isEmail()
    .withMessage("Invalid email format!")
    .escape(),
  body("password")
    .exists()
    .withMessage("Please enter a password!")
    .isString()
    .isStrongPassword({ min: 8, minUppercase: 1, minSymbols: 1 })
    .withMessage(
      "The password must be at least 8 character long, must contain an uppercase letter and a symbol!"
    )
    .escape(),
];
