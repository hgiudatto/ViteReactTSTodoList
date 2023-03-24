import express from "express";
import { resgister } from "../controllers/authentication.js";

export default (router: express.Router) => {
  router.post("/auth/register", resgister);
};
