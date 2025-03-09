import baseRouter from "./route.base.js";
import vectorRouter from "./route.vector.js";
import functionCallRouter from "./route.functionCall.js";

export const configureRoutes = (app) => {
  app.use("/", baseRouter);
  app.use("/vector", vectorRouter);
  app.use("/function-call", functionCallRouter);
};