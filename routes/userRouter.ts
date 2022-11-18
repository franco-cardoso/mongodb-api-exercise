import {Router} from "express";
import { userControllers } from "../controllers";
import userSchema from "../controllers/schemas/userSchema";
import { userMiddleware } from "../middleware";

const userRouter = Router();

userRouter.post("/login", userMiddleware.handleLoginCredentials, userControllers.loginUser);
userRouter.post("/register", userSchema, userControllers.signUpUser);
userRouter.put("/", userMiddleware.isAuth, userControllers.addShowToFav);

export default userRouter;
