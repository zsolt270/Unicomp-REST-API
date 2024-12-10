import { validationResult } from "express-validator";

export const requestValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }
  next();
};
