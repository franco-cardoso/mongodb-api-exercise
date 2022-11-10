import express from "express";
import { showsControllers } from "../controllers";

const showsRouter = express.Router();

showsRouter.get("/", showsControllers.getAllShows);
showsRouter.get("/:id", showsControllers.getShow);
showsRouter.delete("/:id", showsControllers.removeShow);


export default showsRouter;
