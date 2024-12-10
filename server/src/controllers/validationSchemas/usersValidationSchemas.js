import { body } from "express-validator";

export const signUpValidation = [
  body("username")
    .exists({ values: "falsy" })
    .withMessage("Please enter a username!")
    .isString()
    .isLength({ min: 5 })
    .withMessage("The username must be 5 character long!")
    .escape(),
  body("email")
    .exists({ values: "falsy" })
    .withMessage("Please enter an email!")
    .isString()
    .isEmail()
    .withMessage("Invalid email format!")
    .escape(),
  body("password")
    .exists({ values: "falsy" })
    .withMessage("Please enter a password!")
    .isString()
    .isStrongPassword({ min: 8, minUppercase: 1, minSymbols: 1 })
    .withMessage(
      "The password must be at least 8 character long, must contain an uppercase letter and a symbol!"
    )
    .escape(),
  body("confirmPassword")
    .exists({ values: "falsy" })
    .withMessage("Please enter the password a second time!")
    .isString()
    .custom((confirmPassword, { req: request }) => confirmPassword === request.body.password)
    .withMessage("The password and its confirmation do not match!")
    .escape(),
];

export const logInValidation = [
  body("username")
    .exists({ values: "falsy" })
    .withMessage("Please enter a username!")
    .isString()
    .escape(),
  body("password")
    .exists({ values: "falsy" })
    .withMessage("Please enter a password!")
    .isString()
    .escape(),
];
