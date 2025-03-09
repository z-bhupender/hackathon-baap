const config = {
  app: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || "development",
  },
  db: {
    mysql: {
      host: process.env.MYSQL_HOST || "localhost",
      port: parseInt(process.env.MYSQL_PORT || "3306"),
      username: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "password",
      database: process.env.MYSQL_DATABASE || "mydatabase",
    },
    mongodb: {
      host: process.env.MYSQL_HOST || "localhost",
      port: parseInt(process.env.MYSQL_PORT || "3306"),
      username: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "password",
      database: process.env.MYSQL_DATABASE || "mydatabase",
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET || "your-secret-key",
    expiresIn: process.env.JWT_EXPIRES_IN || "90d",
  },
};

module.exports = config;
