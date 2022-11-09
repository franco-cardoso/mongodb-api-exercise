import jwt from "jwt-simple";
import { DateTime } from "luxon";
import { UserType } from "../misc/types";

const createToken = (user: UserType): string => {
    const payload = {
        sub: user._id,
        iat: DateTime.now().toMillis(),
        exp: DateTime.now().plus({ days: 30 }).toMillis(),
    };
    return jwt.encode(payload, process.env.SECRET_KEY as string);
};

const decodeToken = (token: string): Promise<string | { status: number; message: string }> => {
    return new Promise((res, rej) => {
        try {
            const payload = jwt.decode(token, process.env.SECRET_KEY as string);

            if (payload.exp < DateTime.now().toMillis()) {
                rej({ status: 401, message: "La sesión ha expirado" });
            }
            return res(payload.sub);
        } catch (err) {
            rej({ status: 500, message: "Invalid token" });
        }
    });
};

export default { createToken, decodeToken };
