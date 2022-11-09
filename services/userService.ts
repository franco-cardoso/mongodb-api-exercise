import { CallbackError } from "mongoose";
import { UserType } from "../misc/types";
import User from "../models/User";
import authService from "./authService";

const createUser = (userData: UserType): Promise<{ message: string; status: number; token?: string }> => {
    return new Promise((res, rej) => {
        try {
            const newUser = new User(userData);
            User.findOne({ email: userData.email }, (err: CallbackError, user: UserType | undefined) => {
                if (err) throw err;
                if (user) {
                    return rej({
                        status: 400,
                        message: "Este correo ya se encuentra en uso",
                    });
                }

                newUser.save((err) => {
                    if (err) throw err;
                    res({
                        status: 200,
                        message: "Usuario creado con éxito",
                        token: authService.createToken(userData),
                    });
                });
            });
        } catch (err) {
            rej({ status: 500, message: "Ocurrió un error al crear el usuario" });
        }
    });
};

export default { createUser };
