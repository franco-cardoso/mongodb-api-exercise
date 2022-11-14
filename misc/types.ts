import { ObjectId } from "mongoose";

interface UserType {
    _id?: ObjectId;
    username: string;
    email: string;
    password: string;
    registerDate?: Date;
    favorites: string[];
}

interface ShowType {
    [key: string]: string | string[] | undefined;
    _id?: string;
    title: string;
    description: string;
    coverImg: string;
    type: string;
    category: string;
    episodes: string[];
}

interface EpisodeType {
    _id?: ObjectId;
    title: string;
    description: string;
    url: string;
}

export { EpisodeType, UserType, ShowType };
