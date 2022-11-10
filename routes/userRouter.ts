import express from "express";
import { userSchema } from "../controllers/schemas";
import { userControllers } from "../controllers";
import { userMiddleware } from "../middleware";

const userRouter = express.Router();

userRouter.post("/login", userMiddleware.handleLoginCredentials, userControllers.loginUser);
userRouter.post("/register", userSchema, userControllers.signUpUser);

export default userRouter;
