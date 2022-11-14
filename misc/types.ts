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
    _id?: ObjectId;
    title: string;
    description: string;
    coverImg: string;
    type: string;
    category: string;
    episodes: ObjectId[];
}

interface EpisodeType {
    _id?: ObjectId;
    title: string;
    description: string;
    url: string;
}

export { EpisodeType, UserType, ShowType };
