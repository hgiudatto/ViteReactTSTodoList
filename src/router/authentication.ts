import express from "express";
import { login, resgister } from "../controllers/authentication.js";

export default (router: express.Router) => {
  router.post("/auth/register", resgister);
  router.post("/auth/login", login);
};
