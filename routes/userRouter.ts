import express from "express";
import { userSchema } from "../controllers/schemas";
import { userControllers } from "../controllers";

const userRouter = express.Router();

userRouter.post("/login");
userRouter.post("/register", userSchema, userControllers.registerUser);

export default userRouter;
