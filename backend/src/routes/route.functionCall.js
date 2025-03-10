import express from "express";
import { help } from "../controllers/controller.functionCall.js";

const functionCallRouter = express.Router();
functionCallRouter.get("", (_, res) => res.status(200).send("Welcome to the Vector Search Router!"));
functionCallRouter.get("/help", help);

export default functionCallRouter;
