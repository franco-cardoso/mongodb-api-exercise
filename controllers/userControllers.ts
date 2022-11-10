import { Request, Response } from "express";
import { Result, validationResult } from "express-validator";
import { userService } from "../services";

// formato customizado para la validacion de express-validator
const validationFormat = validationResult.withDefaults({
    formatter: (error) => {
        return {
            message: error.msg,
            at: error.param,
        };
    },
});

const loginUser = (req: Request, res: Response) => {
    userService
        .attemptLogin(req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((rej) => res.status(rej.status).send(rej));
};

const signUpUser = (req: Request, res: Response) => {
    const isInvalid: Object[] = validationFormat(req).array();
    if (isInvalid[0]) {
        return res.status(400).send(isInvalid);
    }

    userService
        .createUser(req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((rej) => res.status(rej.status).send(rej));
};


export default { loginUser, signUpUser };
