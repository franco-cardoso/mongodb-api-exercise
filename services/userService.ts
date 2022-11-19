import { compareSync } from "bcrypt";
import { HydratedDocument, Types } from "mongoose";
import { ServiceResponse, UserType } from "../misc/types";
import User from "../models/User";
import authService from "./authService";

const createUser = (userData: UserType): Promise<ServiceResponse> => {
    return new Promise((res, rej) => {
        try {
            const newUser = new User(userData);
            User.findOne(
                // operador $or de mongoose para encontrar un usuario con el nombre o el email
                { $or: [{ email: userData.email }, { username: userData.username }] },
                {},
                (err, user: HydratedDocument<UserType>) => {
                    if (err) throw err;
                    if (user.email === userData.email) {
                        return rej({
                            message: "Este correo ya se encuentra en uso",
                            at: "email",
                            status: 400,
                        });
                    }
                    if (user.username === userData.username) {
                        return rej({
                            message: "Este nombre de usuario ya se encuentra en uso",
                            at: "username",
                            status: 400,
                        });
                    }

                    newUser.save((err) => {
                        if (err) throw err;
                        res({
                            message: "Usuario creado con éxito",
                            data: authService.createToken(userData),
                            status: 200,
                        });
                    });
                }
            );
        } catch (err) {
            rej({ message: "Ocurrió un error al crear el usuario", status: 500, error: err });
        }
    });
};

const attemptLogin = (credentials: {
    email?: string;
    username?: string;
    password: string;
}): Promise<ServiceResponse> => {
    const { password } = credentials;

    return new Promise((res, rej) => {
        // prettier-ignore
        try{
            User.findOne(
            {[Object.keys(credentials)[0]]: Object.values(credentials)[0]},    // usa la primera propiedad de 'credentials' sin saber                                         
            {},(err, user: HydratedDocument<UserType>) => {                    // su nombre, ya que podria ser 'email' o 'username'
                if (err) throw err;
                if (!user) {
                    return rej({ message: "Datos incorrectos", status: 400 });
                }
                if (!compareSync(password, user.password)) {
                    return rej({ message: "Datos incorrectos", status: 400 });
                }
                
                res({ message: "Iniciado sesión con exito", status: 200, data: authService.createToken(user) });
            }
            );
        } catch (err) {
            rej({ message:"Ocurrió un error al iniciar sesión", status: 500, error: err })
        }
    });
};

const addFav = (userId: string, showId: string): Promise<ServiceResponse> => {
    return new Promise((res, rej) => {
        try {
            User.findById(userId, {}, (err, user: HydratedDocument<UserType>) => {
                if (err) throw err;
                if (!user) return rej({ message: "Este usuario no existe", status: 404 });

                const idToAdd = new Types.ObjectId(showId);
                user.updateOne(
                    // si la ID existe en la lista de favoritos usa $pull para eliminarla
                    // si no, usa $push para añadirla
                    { [user.favorites.includes(idToAdd) ? "$pull" : "$push"]: { favorites: idToAdd } },
                    {},
                    (err) => {
                        if (err) throw err;
                        res({ message: "Show añadido a favoritos", status: 200 });
                    }
                );
            });
        } catch (err) {
            rej({ message: "Ocurrió un error al iniciar sesión", status: 500, error: err });
        }
    });
};

export default { createUser, attemptLogin, addFav };
