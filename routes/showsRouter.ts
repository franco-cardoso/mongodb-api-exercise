import { Router } from "express";
import { showsControllers } from "../controllers";
import showSchemaPUT from "../controllers/schemas/showSchemaPUT";
import showSchema from "../controllers/schemas/showSchema";
import episodeSchema from "../controllers/schemas/episodeSchema";
import { showMiddleware } from "../middleware";

const showsRouter = Router();

//      SHOWS
showsRouter.get("/", showsControllers.getShows);
showsRouter.get("/:id", showMiddleware.isValidID, showsControllers.getShowDetails);
showsRouter.delete("/:id", showMiddleware.isValidID, showsControllers.deleteShow);
showsRouter.put("/:id", showMiddleware.isValidID, showSchemaPUT, showsControllers.editShow);
showsRouter.post("/", showSchema, showsControllers.addShow);

//      EPISODES
showsRouter.post("/:id", showMiddleware.isValidID, episodeSchema, showsControllers.addEpisode);
showsRouter.put("/:id/:epId", showMiddleware.isValidID, episodeSchema, showsControllers.editEpisode);
showsRouter.delete("/:id/:epId", showMiddleware.isValidID, showsControllers.removeEpisode);

export default showsRouter;
