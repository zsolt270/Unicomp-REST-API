import { Router } from "express";
const asyncHandler = require("express-async-handler");

const usersRouter = Router();

router.post("/", asyncHandler());

router.post("/login", asyncHandler());

router.get("/me", asyncHandler());

export default usersRouter;
