import express from "express";
import authentication from "./authentication.js";

const router = express.Router();

export default (): express.Router => {
  authentication(router);

  return router;
};
