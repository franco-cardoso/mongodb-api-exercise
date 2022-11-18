require("dotenv").config();
import mongoose from "mongoose";
import express from "express";
import router from "./routes/router";

const app = express();
app.use(express.json());

app.use("/api", router);

mongoose.connect(process.env.MONGO_DB as string, {}, (err) => {
    if (err) throw err;
    console.log("connected to database");
    app.listen(process.env.PORT);
    console.log("server listening on port " + process.env.PORT);
});