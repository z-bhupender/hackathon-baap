import express from "express";

const baseRouter = express.Router();

baseRouter.get("", (_, res) => res.status(200).send("Welcome to the Backend!"));

export default baseRouter;