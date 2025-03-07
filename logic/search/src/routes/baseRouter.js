import express from "express";

const baseRouter = express.Router();

baseRouter.get("", (_, res) => res.status(200).json({ message: "Welcome To Help Search API" }));

export default baseRouter;