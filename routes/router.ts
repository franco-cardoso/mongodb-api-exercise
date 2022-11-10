import userRouter from "./userRouter";
import express from "express";
import showsRouter from "./showsRouter";

const router = express.Router();

router.use("/users", userRouter);
router.use("/shows", showsRouter);

export default router;
