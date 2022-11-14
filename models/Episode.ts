import { model, Schema } from "mongoose";
import { EpisodeType } from "../misc/types";

const EpisodeSchema = new Schema<EpisodeType>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        url: { type: String, required: true },
    },
    { collection: "episodes" }
);

export default model("Episode", EpisodeSchema);
