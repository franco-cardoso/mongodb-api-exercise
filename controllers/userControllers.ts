import User from "../models/User";
import { Request, Response } from "express";
import { validationResult, Result } from "express-validator";
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

const loginUser = (req: Request, res: Response) => {};

const signUpUser = (req: Request, res: Response) => {
    const isInvalid: Object[] = validationFormat(req).array();
    if (isInvalid.length) {
        return res.status(400).send(isInvalid);
    }

    userService
        .createUser(req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((rejected) => res.status(rejected.status).send(rejected));
};



export default { loginUser, signUpUser };
