import { Types, ObjectId } from "mongoose";

interface UserType {
    _id?: Types.ObjectId | string;
    username: string;
    email: string;
    password: string;
    registerDate?: Date;
    favorites: Types.ObjectId[];
}

interface ShowType {
    [key: string]: Types.ObjectId | Types.ObjectId[] | string | string[] | undefined;
    _id: Types.ObjectId | string;
    title: string;
    description: string;
    coverImg: string;
    type: string;
    category: string;
    episodes: Types.ObjectId[];
}

interface EpisodeType {
    _id?: Types.ObjectId | string;
    title: string;
    description: string;
    url: string;
}

export { EpisodeType, UserType, ShowType };
