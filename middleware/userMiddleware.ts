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

const handleLoginCredentials = (req: Request, res: Response, next: NextFunction) => {
    const { userHandle, password } = req.body;
    if (!userHandle) {
        return res.status(400).send({ message: "Debes ingresar tu nombre de usuario o correo", status: 400 });
    }
    if (!password) {
        return res.status(400).send({ message: "Debes ingresar tu contraseña", status: 400 });
    }

    const typeOfHandle = userHandle.includes("@") ? "email" : "username";
    req.body = {
        [typeOfHandle]: userHandle,
        password: password,
    };
    next();
};

export default { isAuth, handleLoginCredentials };
