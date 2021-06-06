const dbConfig = require("../config/dbConfig");
const Sequelize = require("sequelize");


const sequelize = new Sequelize(dbConfig.database, dbConfig.dBUser, dbConfig.dBPassword, {
  host: dbConfig.dBHost,
  dialect: dbConfig.dBDialect,
  logging: dbConfig.dBLogging,
  //operatorsAliases: false,

  pool: {
    max: dbConfig.dBPool.max,
    min: dbConfig.dBPool.min,
    acquire: dbConfig.dBPool.acquire,
    idle: dbConfig.dBPool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.passwordModel = require("./passwordModel.js")(sequelize, Sequelize);

module.exports = db;
