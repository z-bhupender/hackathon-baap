import express from "express";
import { search, insert, list } from "../controllers/searchController.js";

const searchRouter = express.Router();

searchRouter.get("/", (req, res) => {
  res.send("Search route");
});

searchRouter.get("/list", list);
searchRouter.post("/query", search);
searchRouter.post("/insert", insert);

export default searchRouter;