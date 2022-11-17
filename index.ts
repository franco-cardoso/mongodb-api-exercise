require("dotenv").config();
import mongoose, { CallbackError, Types } from "mongoose";
import express from "express";
import router from "./routes/router";

const app = express();
app.use(express.json());

app.use("/api", router);

mongoose.connect(process.env.MONGO_DB as string, {}, (err: CallbackError) => {
    if (err) throw err;
    console.log("connected to database");
    app.listen(process.env.PORT);
    console.log("server listening on port " + process.env.PORT);
});

const obj = {
    test:"test",
    episodes:[
        new Types.ObjectId("63755e5f40c41789b1b7d8d2"),
        new Types.ObjectId("63755e6540c41789b1b7d8d5"),
    ]
}

console.log(obj.episodes.filter((item) => String(item) !== "63755e5f40c41789b1b7d8d2"))