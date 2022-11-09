import { NextFunction, Request, Response } from "express";
import { authService } from "../services";

const isAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(403).send({ status: 403, message: "No se ha iniciado sesión" });
    }
    const token: string = req.headers.authorization.split(" ")[1];
    authService
        .decodeToken(token)
        .then((result) => {
            res.locals.currentUser = result;
            next();
        })
        .catch((rejected) => {
            res.status(rejected.status).send(rejected);
        });
};

export default { isAuth };
