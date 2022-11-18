import { Types } from "mongoose";

// las keys estan tipadas a 'string'
// porque typescript no me dejaba indexar
// objetos de estos tipo usando strings
interface UserType {
    [key: string]: any;
    _id?: Types.ObjectId | string;
    username: string;
    email: string;
    password: string;
    registerDate?: Date;
    favorites: Types.ObjectId[];
}

interface ShowType {
    [key: string]: any;
    _id: Types.ObjectId | string;
    title: string;
    description: string;
    coverImg: string;
    type: string;
    category: string;
    episodes: Types.ObjectId[];
}

interface EpisodeType {
    [key: string]: any;
    _id?: Types.ObjectId | string;
    title: string;
    description: string;
    url: string;
}

interface ServiceResponse {
    message: string;
    status: number;
    data?: any;
}

export { EpisodeType, UserType, ShowType, ServiceResponse };
