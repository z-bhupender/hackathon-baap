import { Sequelize } from "sequelize";
import { sqlCredentials } from "../constants/constants.js";
import { logger } from "../utils/logger.js";

export const sequelize = new Sequelize(
  sqlCredentials.database,
  sqlCredentials.username,
  sqlCredentials.password,
  {
    host: sqlCredentials.host,
    port: sqlCredentials.port,
    dialect: "mysql",
    logging: (msg) => logger.debug(msg),
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);
