import { Schema, model, Types } from "mongoose";
import { ShowType } from "../misc/types";

const ShowSchema = new Schema<ShowType>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        coverPic: { type: String, required: true },
        category: { type: String, required: true },
        type: { type: String, required: true },
        episodes: { type: [Types.ObjectId], required: true },
    },
    { collection: "Shows" }
);

export default model("Show", ShowSchema);
