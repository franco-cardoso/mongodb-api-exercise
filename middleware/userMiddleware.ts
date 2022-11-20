import { NextFunction, Request, Response } from "express";
import { authService } from "../services";

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(403).send({ status: 403, message: "No se ha iniciado sesión" });
    }
    const token: string = req.headers.authorization.split(" ")[1];
    await authService
        .decodeToken(token)
        .then((result) => {
            res.locals.currentUser = result.data;
            next();
        })
        .catch((rej) => {
            res.status(rej.status).send(rej);
        });
};

// la propiedad 'userHandle' en las credenciales para iniciar sesión puede ser
// el correo o el nombre de usuario, este middleware se asegura de que userHandle
// se renombre a 'email' o 'username' acordemente
const handleLoginCredentials = (req: Request, res: Response, next: NextFunction) => {
    const { userHandle, password } = req.body;
    const typeOfHandle = userHandle.includes("@") ? "email" : "username";

    if (!userHandle) {
        return res.status(400).send({
            message: "Debes ingresar tu nombre de usuario o correo",
            at: "userHandle",
            status: 400,
        });
    }
    if (!password) {
        return res.status(400).send({
            message: "Debes ingresar tu contraseña",
            at: "password",
            status: 400,
        });
    }

    req.body = {
        [typeOfHandle]: userHandle,
        password: password,
    };
    next();
};


export default { isAuth, handleLoginCredentials };
