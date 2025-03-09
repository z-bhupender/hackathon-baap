import express from "express";
import { search, insert, list } from "../controllers/controller.vectorSearch.js";

const vectorRouter = express.Router();
vectorRouter.get("", (_, res) => res.status(200).send("Welcome to the Vector Search Router!"));
vectorRouter.get("/list-helps", list);
vectorRouter.post("/query-helps", search);
vectorRouter.post("/insert-helps", insert);

export default vectorRouter;