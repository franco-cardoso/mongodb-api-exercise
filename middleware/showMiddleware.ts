import { NextFunction, Request, Response } from "express";

// ingresar una id invalida en mongoose
// crasheaba el servidor, incluso con un try...catch
const isValidID = (req: Request, res: Response, next: NextFunction) => {
    const IDs = req.params;
    for (const key in IDs) {
        if (IDs[key].match(/^[0-9a-fA-F]{24}$/)) continue;
        else return res.status(400).send({ message: "ID inválida", status: 400 });
    }
    next();
};

export default { isValidID };
