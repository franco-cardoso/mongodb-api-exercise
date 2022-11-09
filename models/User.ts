import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { UserType } from "../misc/types";


const UserSchema = new Schema<UserType>({
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    registerDate: { type: Date, required: true },
    favorites: { type: [String], required: false },
});

UserSchema.pre("save", (next) => {
    const user: UserType = this;
    bcrypt.genSalt(10, (err: Error, salt: string) => {
        if (err) throw err;
        bcrypt.hash(user.password, salt, (err: Error, hash: string) => {
            if (err) throw err;
            user.password = hash;
            next();
        });
    });
});

export default model("User", UserSchema);
