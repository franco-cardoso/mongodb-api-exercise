import { Router } from "express";
import { showsControllers } from "../controllers";
import showSchemaPUT from "../controllers/schemas/showSchemaPUT";
import showSchema from "../controllers/schemas/showSchema";
import episodeSchema from "../controllers/schemas/episodeSchema";

const showsRouter = Router();

//      SHOWS
showsRouter.get("/", showsControllers.getShows);
showsRouter.get("/:id", showsControllers.getShowDetails);
showsRouter.delete("/:id", showsControllers.deleteShow);
showsRouter.put("/:id", showSchemaPUT, showsControllers.editShow);
showsRouter.post("/", showSchema, showsControllers.addShow);

//      EPISODES
showsRouter.post("/:id", episodeSchema, showsControllers.addEpisode);
showsRouter.put("/:id/:epId", episodeSchema, showsControllers.editEpisode);
showsRouter.delete("/:id/:epId", showsControllers.removeEpisode);

export default showsRouter;
