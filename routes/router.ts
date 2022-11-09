import userRouter from "./userRouter";
import express from "express";

const router = express.Router();

router.use("/users",userRouter)

export default router;