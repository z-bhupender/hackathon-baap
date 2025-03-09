const sequelize = require("./mysql");
const logger = require("../utils/logger");

// Test connection
(async () => {
  try {
    await sequelize.authenticate();
    logger.info("MySQL database connection has been established successfully.");

    // Sync models with database (in development)
    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ alter: true });
      logger.info("Database models synchronized.");
    }
  } catch (error) {
    logger.error("Unable to connect to the MySQL database:", error);
    process.exit(1);
  }
})();

module.exports = sequelize;
