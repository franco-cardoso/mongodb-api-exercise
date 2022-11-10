import express from "express";
import { showsControllers } from "../controllers";
import showSchema from "../controllers/schemas/showSchema";

const showsRouter = express.Router();

showsRouter.get("/", showsControllers.getAllShows);
showsRouter.get("/:id", showsControllers.getShow);
showsRouter.delete("/:id", showsControllers.removeShow);
showsRouter.put("/:id", showSchema, showsControllers.editShow);

export default showsRouter;
