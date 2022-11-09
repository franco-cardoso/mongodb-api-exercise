import User from "../models/User";
import { Request, Response } from "express";
import { validationResult, Result } from "express-validator";

const loginUser = (req: Request, res: Response) => {};

const registerUser = (req: Request, res: Response) => {
    const isInvalid = validationResult(req);
    if (!isInvalid.isEmpty()) {
        res.status(400).send(isInvalid);
    }
};

export default { loginUser, registerUser };
