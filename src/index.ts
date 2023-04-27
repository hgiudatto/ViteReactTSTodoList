import * as dotenv from "dotenv";
import router from "./router/index.js";
import { statusRetriever } from "./aux/DBConnStatusMgr.js";

dotenv.config();

import express from "express";
import http from "http";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});

const mongodb_url: string = process.env.MONGO_URL as string;
mongoose.Promise = Promise;
mongoose.connect(mongodb_url);

let dbConnState: number = mongoose.connection.readyState;

console.log(`DB Connection status: `, statusRetriever(dbConnState));

mongoose.connection.on("error", (error: Error) => {
  console.log(error);
});

app.use("/", router());
