import { Types } from "mongoose";

// las keys estan tipadas a 'string'
// porque typescript no me dejaba indexar
// objetos de estos tipos usando strings
type UserType = {
    [key: string]: any;
    _id?: Types.ObjectId | string;
    username: string;
    email: string;
    password: string;
    registerDate?: Date;
    favorites: Types.ObjectId[];
}

type ShowType = {
    [key: string]: any;
    _id: Types.ObjectId | string;
    title: string;
    description: string;
    coverImg: string;
    type: string;
    categories: [string];
    episodes: Types.ObjectId[];
}

type EpisodeType = {
    [key: string]: any;
    _id?: Types.ObjectId | string;
    title: string;
    description: string;
    url: string;
}

type ServiceResponse = {
    message: string;
    status: number;
    data?: any;
}

export { EpisodeType, UserType, ShowType, ServiceResponse };
