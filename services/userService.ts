import { compareSync } from "bcrypt";
import { HydratedDocument } from "mongoose";
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
                {},
                (err, user: HydratedDocument<UserType>) => {
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

const attemptLogin = (credentials: {
    email?: string;
    username?: string;
    password: string;
}): Promise<{ message: string; status: number; token?: string }> => {
    const { password } = credentials;

    return new Promise((res, rej) => {
        // prettier-ignore
        try{
            User.findOne(
            {[Object.keys(credentials)[0]]: Object.values(credentials)[0]},         // usa la primera propiedad de 'credentials' sin saber                                         
            {},(err, user: HydratedDocument<UserType>) => {                         // su nombre, ya que podria ser 'email' o 'username'
                if (err) {
                    return rej({ message: "Ocurrió un error al intentar iniciar sesión", status: 500 });
                }
                if (!user) {
                    return rej({ message: "Datos incorrectos", status: 400 });
                }
                if (!compareSync(password, user.password)) {
                    return rej({ message: "Datos incorrectos", status: 400 });
                }
                
                res({ message: "Iniciado sesión con exito", status: 200, token: authService.createToken(user) });
            }
            );
        } catch (err) {
            rej({message:"Ocurrió un error al iniciar sesión",status:500})
        }
    });
};

export default { createUser, attemptLogin };
