import winston from "winston";
import { env } from "../constants/constants.js";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const level = () => (env === "development" ? "debug" : "info");

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: "logs/error.log", level: "error" }),
  new winston.transports.File({ filename: "logs/combined.log" }),
];

export const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});
