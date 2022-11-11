const Sequelize = require("sequelize");
const baseConfig = require("./baseConfig");
const env = require("dotenv").config();

const db = new Sequelize(
  `${baseConfig.db_name}`,
  `${baseConfig.db_user}`,
  `${baseConfig.db_password}`,
  {
    host: baseConfig.host,
    dialect: "mysql",
  }
);

module.exports = db;
