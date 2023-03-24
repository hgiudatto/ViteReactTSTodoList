import * as dotenv from "dotenv";
import DBConnectionStates from "./types.d";
import router from "./router/index.js";

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

switch (dbConnState) {
  case 0:
    console.log(`DB Connection state: DISCONNECTED`);
    break;
  case 1:
    console.log(`DB Connection state: CONNECTED`);
    break;
  case 2:
    console.log(`DB Connection state: CONNECTING`);
    break;
  case 3:
    console.log(`DB Connection state: DISCONNECTING`);
    break;
  case 99:
    console.log(`DB Connection state: UNINITIALIZED`);
    break;
  default:
    console.log(`DB Connection state: UNKNOWN`);
    break;
}

mongoose.connection.on("error", (error: Error) => {
  console.log(error);
});

app.use("/", router());
