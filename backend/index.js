import express from "express";
import { env } from "./src/constants/constants.js";
import { configureRoutes } from "./src/routes/routes.js";
import { configureMongoDB } from "./src/database/mongoose.js";
import { configureMiddleware } from "./src/middleware/middleware.js";

const app = express();

configureMiddleware(app);
configureMongoDB();
configureRoutes(app);

const port = 8000;

if (env === "development") {
  app.listen(port, () => {
    console.log(`---> 🚀 App Is Up And Running On Port ${port}!`);
  });
}

export default app;