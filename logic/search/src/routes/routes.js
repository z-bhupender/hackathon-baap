import baseRouter from "./baseRouter.js";
import searchRouter from "./searchRouter.js";

export const configureRoutes = (app) => {
  app.use("/about", baseRouter);
  app.use("", searchRouter);
};