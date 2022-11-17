import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { UserType } from "../misc/types";
import { DateTime } from "luxon";

const UserSchema = new Schema<UserType>(
    {
        email: { type: String, required: true, lowercase: true, unique: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        registerDate: { type: Date, required: true, default: DateTime.now() },
        favorites: { type: [String], required: false, default: [] },
    },
    { collection: "users" }
);

UserSchema.pre("save", function (next) {
    const user: UserType = this;
    bcrypt.genSalt(10, (err, salt: string) => {
        if (err) throw err;
        bcrypt.hash(user.password, salt, (err, hash: string) => {
            if (err) throw err;
            user.password = hash;
            next();
        });
    });
});

export default model<UserType>("User", UserSchema);
