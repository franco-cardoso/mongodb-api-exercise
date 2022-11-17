import { Request, Response } from "express";
import { validationFormatter } from ".";
import { showsService } from "../services";

// -----
// SHOWS
// -----

const getAllShows = async (req: Request, res: Response) => {
    await showsService
        .getShows(req.query.search as string)
        .then((result) => res.status(result.status).json(result.shows))
        .catch((rej) => res.status(rej.status).send(rej));
};

const getShow = async (req: Request, res: Response) => {
    await showsService
        .getShowByID(req.params.id)
        .then((result) => res.status(result.status).json(result.show))
        .catch((rej) => res.status(rej.status).send(rej));
};

const removeShow = async (req: Request, res: Response) => {
    await showsService
        .deleteShow(req.params.id)
        .then((result) => res.send(result))
        .catch((rej) => res.status(rej.status).send(rej));
};

const editShow = async (req: Request, res: Response) => {
    const isInvalid: Object[] = validationFormatter(req).array();
    if (isInvalid[0]) return res.status(400).send(isInvalid);

    await showsService
        .editEntry(req.params.id, "Show", req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((rej) => res.status(rej.status).send(rej));
};

const addShow = async (req: Request, res: Response) => {
    const isInvalid: Object[] = validationFormatter(req).array();
    if (isInvalid[0]) return res.status(400).send(isInvalid);

    await showsService
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

const addEpisode = async (req: Request, res: Response) => {
    const isInvalid: Object[] = validationFormatter(req).array();
    if (isInvalid[0]) return res.status(400).send(isInvalid);

    await showsService
        .createNewEpisode(req.body, req.params.id)
        .then((result) => res.status(result.status).send(result))
        .catch((rej) => res.status(rej.status).send(rej));
};

const editEpisode = async (req: Request, res: Response) => {
    const isInvalid: Object[] = validationFormatter(req).array();
    if (isInvalid[0]) return res.status(400).send(isInvalid);

    await showsService
        .editEntry(req.params.epId, "Episode", req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((rej) => res.status(rej.status).send(rej));
};

const removeEpisode = async (req: Request, res: Response) => {
    await showsService
        .deleteEpisode(req.params.epId, req.params.id)
        .then((result) => res.status(result.status).send(result))
        .catch((rej) => res.status(rej.status).send(rej));
};

export default { addShow, getAllShows, getShow, removeShow, editShow, addEpisode, editEpisode, removeEpisode };
