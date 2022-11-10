import express from "express";
import { showsControllers } from "../controllers";
import showSchema from "../controllers/schemas/showSchema";
import showSchemaPOST from "../controllers/schemas/showSchemaPOST";

const showsRouter = express.Router();

showsRouter.get("/", showsControllers.getAllShows);
showsRouter.get("/:id", showsControllers.getShow);
showsRouter.delete("/:id", showsControllers.removeShow);
showsRouter.put("/:id", showSchema, showsControllers.editShow);
showsRouter.post("/", showSchemaPOST, showsControllers.addShow);

export default showsRouter;
