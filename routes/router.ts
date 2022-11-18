import userRouter from "./userRouter";
import { Router } from "express";
import showsRouter from "./showsRouter";

const router = Router();

router.use("/users", userRouter);
router.use("/shows", showsRouter);

export default router;
