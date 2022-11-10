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
    title: string,
    description: string,
    coverPic: string,
    type: string,
    category: string,
    episodes: ObjectId[],
}

export { UserType, ShowType };
