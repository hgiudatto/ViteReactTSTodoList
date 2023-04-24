import * as dotenv from "dotenv";
import router from "./router/index.js";
import { Direction, DBConnStatus } from "./types.d";

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
// mongoose.connect(mongodb_url);

let dbConnState: number = mongoose.connection.readyState;
let direction: Direction;
let dbConnStatus: DBConnStatus;

direction = {
  Down: "down",
  Up: "up",
  Left: "left",
  Right: "right",
};

dbConnStatus = {
  disconnected: "DISCONNECTED",
  connected: "CONNECTED",
  connecting: "CONNECTING",
  disconnecting: "DISCONNECTING",
  uninitialized: "UNINITIALIZED",
  unknown: "UNKNOWN",
};

switch (dbConnState) {
  case 0:
    console.log(`DB Connection state: ${dbConnStatus.disconnected}`);
    break;
  case 1:
    console.log(`DB Connection state: ${dbConnStatus.connected}`);
    break;
  case 2:
    console.log(`DB Connection state: ${dbConnStatus.connecting}`);
    console.log(`Moving to ${direction.Right}`);

    break;
  case 3:
    console.log(`DB Connection state: ${dbConnStatus.disconnecting}`);
    break;
  case 99:
    console.log(`DB Connection state: ${dbConnStatus.uninitialized}`);
    break;
  default:
    console.log(`DB Connection state: ${dbConnStatus.unknown}`);
    break;
}

mongoose.connection.on("error", (error: Error) => {
  console.log(error);
});

app.use("/", router());
