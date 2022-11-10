import { Request, Response } from "express";
import { Result, validationResult } from "express-validator";
import { validationFormatter } from ".";
import { userService } from "../services";


const loginUser = (req: Request, res: Response) => {
    userService
        .attemptLogin(req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((rej) => res.status(rej.status).send(rej));
};

const signUpUser = (req: Request, res: Response) => {
    const isInvalid: Object[] = validationFormatter(req).array();
    if (isInvalid[0]) {
        return res.status(400).send(isInvalid);
    }

    userService
        .createUser(req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((rej) => res.status(rej.status).send(rej));
};


export default { loginUser, signUpUser };
