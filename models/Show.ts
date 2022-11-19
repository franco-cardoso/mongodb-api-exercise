import { Schema, model, Types } from "mongoose";
import { ShowType } from "../misc/types";

const ShowSchema = new Schema<ShowType>(
    {
        title: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        coverImg: { type: String, required: true },
        type: { type: String, required: true },
        categories: { type: [String], required: true },
        episodes: { type: [Types.ObjectId], required: true, default: [] },
    },
    { collection: "shows" }
);

export default model<ShowType>("Show", ShowSchema);
