import { Request, Response } from "express";
import { showsService } from "../services";

const getAllShows = (req: Request, res: Response) => {
    showsService
        .getShows()
        .then((result) => res.status(result.status).json(result.shows))
        .catch((rejected) => res.status(rejected.status).send(rejected));
};

const getShow = (req: Request, res: Response) => {
    showsService
        .getShowByID(req.params.id)
        .then((result) => res.status(result.status).json(result.show))
        .catch((rejected) => res.status(rejected.status).send(rejected));
};

export default { getAllShows, getShow };
