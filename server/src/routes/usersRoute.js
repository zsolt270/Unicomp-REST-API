import { Router } from "express";
import asyncHandler from "express-async-handler";
import { signUpValidation } from "../controllers/validationSchemas/usersValidationSchemas.js";
import User from "../controllers/usersController.js";

const usersRouter = Router();
const user = new User();

usersRouter.post("/", signUpValidation, asyncHandler(user.signUp));

usersRouter.post("/login", asyncHandler(user.signUp));

usersRouter.get("/me", asyncHandler(user.signUp));

export default usersRouter;
