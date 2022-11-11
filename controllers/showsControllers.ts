import { Request, Response } from "express";
import { validationFormatter } from ".";
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

const editShow = (req: Request, res: Response) => {
    const isInvalid: Object[] = validationFormatter(req).array();
    if (isInvalid[0]) {
        return res.status(400).send(isInvalid);
    }
    showsService
        .editShow(req.params.id, req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((rej) => res.status(rej.status).send(rej));
};

const addShow = (req: Request, res: Response) => {
    const isInvalid: Object[] = validationFormatter(req).array();
    if (isInvalid[0]) {
        return res.status(400).send(isInvalid);
    }
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
export default { addShow, getAllShows, getShow, removeShow, editShow };
