import { Request, Response } from "express";
import { validationFormatter } from ".";
import { showsService } from "../services";

// -----
// SHOWS
// -----

const getShows = async (req: Request, res: Response) => {
    await showsService
        .getShowsBySearch(req.query.search as string)
        .then((result) => res.status(result.status).json(result.shows))
        .catch((rej) => res.status(rej.status).send(rej));
};

const getShow = async (req: Request, res: Response) => {
    // el query param 'episodes' se usa para elegir si se quieren
    // recibir los detalles del show, o sus episodios
    if (req.query.episodes) {
        await showsService
            .getEpisodesByShowID(req.params.id)
            .then((result) => res.status(result.status).send(result))
            .catch((rej) => res.status(rej.status).send(rej));
    } else {
        await showsService
            .getShowByID(req.params.id)
            .then((result) => res.status(result.status).json(result))
            .catch((rej) => res.status(rej.status).send(rej));
    }
};

const deleteShow = async (req: Request, res: Response) => {
    await showsService
        .deleteShowByID(req.params.id)
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
        .createNewShow(req.body)
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
        .deleteEpisodeByID(req.params.epId, req.params.id)
        .then((result) => res.status(result.status).send(result))
        .catch((rej) => res.status(rej.status).send(rej));
};


export default {
    addShow,
    getShows,
    getShow,
    deleteShow,
    editShow,
    addEpisode,
    editEpisode,
    removeEpisode,
};
