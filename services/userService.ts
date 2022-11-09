import { CallbackError } from "mongoose";
import { UserType } from "../misc/types";
import User from "../models/User";
import authService from "./authService";

const createUser = (userData: UserType): Promise<{ message: string; status: number; token?: string }> => {
    return new Promise((res, rej) => {
        try {
            const newUser = new User(userData);
            User.findOne(
                // operador $or de mongoose para encontrar un usuario con el nombre o el email
                { $or: [{ email: userData.email }, { username: userData.username }] },
                (err: CallbackError, user: UserType | undefined) => {
                    if (err) throw err;
                    if (user) {
                        return rej({
                            message: "Este correo ya se encuentra en uso",
                            at: "email",
                            status: 400,
                        });
                    }

                    newUser.save((err) => {
                        if (err) throw err;
                        res({
                            message: "Usuario creado con éxito",
                            token: authService.createToken(userData),
                            status: 200,
                        });
                    });
                }
            );
        } catch (err) {
            rej({ status: 500, message: "Ocurrió un error al crear el usuario" });
        }
    });
};

export default { createUser };
