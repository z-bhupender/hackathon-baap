import express from "express";
import { search, insert } from "../controllers/searchController.js";

const searchRouter = express.Router();

searchRouter.post("/query", search);
searchRouter.post("/insert", insert);

export default searchRouter;