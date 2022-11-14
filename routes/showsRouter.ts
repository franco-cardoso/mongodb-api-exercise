import express from "express";
import { showsControllers } from "../controllers";
import showSchemaPUT from "../controllers/schemas/showSchemaPUT";
import showSchema from "../controllers/schemas/showSchema";
import episodeSchema from "../controllers/schemas/episodeSchema";

const showsRouter = express.Router();

//      SHOWS
showsRouter.get("/", showsControllers.getAllShows);
showsRouter.get("/:id", showsControllers.getShow);
showsRouter.delete("/:id", showsControllers.removeShow);
showsRouter.put("/:id", showSchemaPUT, showsControllers.editShow);
showsRouter.post("/", showSchema, showsControllers.addShow);

//      EPISODES
showsRouter.post("/:id", episodeSchema, showsControllers.addEpisode);

export default showsRouter;
