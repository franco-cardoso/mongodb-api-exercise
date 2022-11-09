import User from "../models/User";
import { Request, Response } from "express";
import { validationResult, Result } from "express-validator";
import { userService } from "../services";

const loginUser = (req: Request, res: Response) => {};

const signUpUser = (req: Request, res: Response) => {
    const isInvalid = validationResult(req);
    if (!isInvalid.isEmpty()) {
        return res.status(400).send(isInvalid);
    }
    userService.createUser(req.body).then((response) => res.send(response));
};

export default { loginUser, signUpUser };
