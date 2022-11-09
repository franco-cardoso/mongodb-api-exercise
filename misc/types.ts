import { ObjectId } from "mongoose";

interface UserType {
    _id?: ObjectId;
    username: string;
    email: string;
    password: string;
    registerDate?: Date;
    favorites?: string[];
}

export { UserType };
