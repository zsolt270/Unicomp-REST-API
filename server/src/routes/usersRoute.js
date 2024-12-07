import { Router } from "express";
// const asyncHandler = require("express-async-handler");
import asyncHandler from "express-async-handler";

const usersRouter = Router();

usersRouter.post("/", asyncHandler());

usersRouter.post("/login", asyncHandler());

usersRouter.get("/me", asyncHandler());

export default usersRouter;
