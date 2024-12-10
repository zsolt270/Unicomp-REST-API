import { Router } from "express";
import asyncHandler from "express-async-handler";
import {
  signUpValidation,
  logInValidation,
} from "../controllers/validationSchemas/usersValidationSchemas.js";
import { requestValidator } from "../middleware/requestValidator.js";
import User from "../controllers/usersController.js";

const usersRouter = Router();
const user = new User();

usersRouter.post("/", signUpValidation, requestValidator, asyncHandler(user.signUp));

usersRouter.post("/login", logInValidation, requestValidator, asyncHandler(user.logIn));

usersRouter.get("/me", asyncHandler(user.signUp));

export default usersRouter;
