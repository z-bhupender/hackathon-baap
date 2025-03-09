const { Sequelize } = require("sequelize");
const config = require("../config");
const logger = require("../utils/logger");

const { host, port, username, password, database } = config.db.mysql;

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect: "mysql",
  logging: (msg) => logger.debug(msg),
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
