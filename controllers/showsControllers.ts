import { Request, Response } from "express";
import { showsService } from "../services";

const getAllShows = (req: Request, res: Response) => {
    showsService
        .getShows()
        .then((result) => res.status(result.status).json(result.shows))
        .catch((rej) => res.status(rej.status).send(rej));
};

const getShow = (req: Request, res: Response) => {
    showsService
        .getShowByID(req.params.id)
        .then((result) => res.status(result.status).json(result.show))
        .catch((rej) => res.status(rej.status).send(rej));
};

const removeShow = (req: Request, res: Response) => {
    showsService
        .removeShowByID(req.params.id)
        .then((result) => res.send(result))
        .catch((rej) => res.status(rej.status).send(rej));
};

export default { getAllShows, getShow, removeShow };
