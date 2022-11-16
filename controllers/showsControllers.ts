import { Request, Response } from "express";
import { validationFormatter } from ".";
import { showsService } from "../services";

// -----
// SHOWS
// -----

const getAllShows = (req: Request, res: Response) => {
    showsService
        .getShows(req.query.search as string)
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
        .removeEntry(req.params.id, "Show")
        .then((result) => res.send(result))
        .catch((rej) => res.status(rej.status).send(rej));
};

const editShow = (req: Request, res: Response) => {
    const isInvalid: Object[] = validationFormatter(req).array();
    if (isInvalid[0]) return res.status(400).send(isInvalid);

    showsService
        .editEntry(req.params.id, "Show", req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((rej) => res.status(rej.status).send(rej));
};

const addShow = (req: Request, res: Response) => {
    const isInvalid: Object[] = validationFormatter(req).array();
    if (isInvalid[0]) return res.status(400).send(isInvalid);

    showsService
        .createShow(req.body)
        .then((result) =>
            res
                .status(result.status)
                .header({ Location: `${process.env.HOSTNAME}:${process.env.PORT}/api/shows/${result.id}` })
                .send(result)
        )
        .catch((rej) => res.status(rej.status).send(rej));
};

// --------
// EPISODES
// --------

const addEpisode = (req: Request, res: Response) => {
    const isInvalid: Object[] = validationFormatter(req).array();
    if (isInvalid[0]) return res.status(400).send(isInvalid);

    showsService
        .createNewEpisode(req.body, req.params.id)
        .then((result) => res.status(result.status).send(result))
        .catch((rej) => res.status(rej.status).send(rej));
};

const editEpisode = (req: Request, res: Response) => {
    const isInvalid: Object[] = validationFormatter(req).array();
    if (isInvalid[0]) return res.status(400).send(isInvalid);

    showsService
        .editEntry(req.params.epId, "Episode", req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((rej) => res.status(rej.status).send(rej));
};

const removeEpisode = (req: Request, res: Response) => {
    showsService
        .removeEntry(req.params.epId, "Episode")
        .then((result) => res.status(result.status).send(result))
        .catch((rej) => res.status(rej.status).send(rej));
};

export default { addShow, getAllShows, getShow, removeShow, editShow, addEpisode, editEpisode, removeEpisode };
