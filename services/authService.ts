import jwt from "jwt-simple";
import { DateTime } from "luxon";
import { ServiceResponse, UserType } from "../misc/types";

const createToken = (user: UserType): string => {
    const payload = {
        sub: user._id,
        iat: DateTime.now().toMillis(),
        exp: DateTime.now().plus({ days: 30 }).toMillis(),
    };
    return jwt.encode(payload, process.env.SECRET_KEY as string);
};

const decodeToken = (token: string): Promise<ServiceResponse> => {
    return new Promise((res, rej) => {
        try {
            const payload = jwt.decode(token, process.env.SECRET_KEY as string);

            if (payload.exp < DateTime.now().toMillis()) {
                return rej({ status: 403, message: "La sesión ha expirado" });
            }
            return res({ message: "", status: 200, data: payload.sub });
        } catch (err) {
            rej({ status: 401, message: "Invalid token" });
        }
    });
};

export default { createToken, decodeToken };
