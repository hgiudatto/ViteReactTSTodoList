import * as dotenv from "dotenv";
import router from "./router/index.js";
import { statusRetriever } from "./mgr/DBConnStatusMgr.js";
import * as jwt from "jsonwebtoken";

dotenv.config();

import express, { Router } from "express";

import http from "http";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import users from "./router/users.js";
import { parsePath } from "react-router-dom";

const demo = {
  privateKey: "eyJ1c2VybmFtZSI6InVzZXIwIiwiaWF0IjoxNTE2MjM5MDIyfQ",
  users: [
    {
      username: "user0",
      password: "pass0",
      actions: [
        { name: "Like", image: "/assets/like.png" },
        { name: "Comment", image: "/assets/comment.png" },
      ],
    },
    {
      username: "user1",
      password: "pass1",
      actions: [
        { name: "Share", image: "/assets/share.png" },
        { name: "Suscribe", image: "/assets/suscribe.png" },
      ],
    },
  ],
};

// Creamos la app
const app = express();

/* app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
}); */

// o
app.use(cors());

// Obtenemos un frontend estatico
app.use(express.static("public"));

// API
const api = Router();

api.use(express.json());

api.use((req, res, next) => {
  if (!req.body)
    return res.status(400).send({ error: "Invalid request" });
  else return next();
});

api.post("/login", (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({ error: "Invalid request" });
  }
  const user = demo.users.find(
    (u) =>
      u.username === req.body.username &&
      u.password === req.body.password
  );
  if (!user) {
    return res
      .status(401)
      .send({ error: "Invalid username or password" });
  }
  return res.send({ token: { username: user.username } });
});

api.post("/actions", (req, res) => {
  const sendInvalid = () => {
    res.status(401).send({ error: "Invalid token" });
  };
  if (!req.body.token) {
    return sendInvalid();
  }

  const username = req.body.token.username;

  const user = demo.users.find((u) => u.username === username);
  if (!user) {
    return sendInvalid();
  }

  return res.send({ actions: user.actions });
});

app.use("/api", api);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port: ${process.env.PORT}`);
});

/* app.use(
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

console.log(`DB Connection status: `, statusRetriever(dbConnState));

mongoose.connection.on("error", (error: Error) => {
  console.log(error);
});

app.use("/", router()); */
