require("dotenv").config();
import mongoose, { CallbackError, ObjectId, Types } from "mongoose";
import express from "express";
import router from "./routes/router";
import User from "./models/User";

const app = express();
app.use(express.json());

app.use("/api", router);

mongoose.connect(process.env.MONGO_DB as string, {}, (err: CallbackError) => {
    if (err) throw err;
    console.log("connected to database");
    app.listen(process.env.PORT);
    console.log("server listening on port " + process.env.PORT);
});
