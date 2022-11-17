import { Request, Response } from "express";
import { validationFormatter } from ".";
import { userService } from "../services";

const loginUser = async (req: Request, res: Response) => {
    await userService
        .attemptLogin(req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((rej) => res.status(rej.status).send(rej));
};

const signUpUser = async (req: Request, res: Response) => {
    const isInvalid: Object[] = validationFormatter(req).array();
    if (isInvalid[0]) return res.status(400).send(isInvalid);

    await userService
        .createUser(req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((rej) => res.status(rej.status).send(rej));
};

const addShowToFav = async (req: Request, res: Response) => {
    await userService
        .addFav(res.locals.currentUser, req.query.fav as string)
        .then((result) => res.status(result.status).send(result))
        .catch((rej) => res.status(rej.status).send(rej));
};

export default { loginUser, signUpUser, addShowToFav };
