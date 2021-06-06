var config = {}
require('dotenv').config();

var dBLogging = false
var dBdialectOptionsuseUTC = true
var forceDbRecreate = false

if (process.env.DBLOGGING === "true"){
  dBLogging = true
}

if (process.env.DBDIALECTOPTIONSUSEUTC === "false"){
  dBdialectOptionsuseUTC = false
}

if (process.env.FORCEDBRECREATE === "true"){
  forceDbRecreate = true
}

config = {
    encryptionKey: process.env.ENCRYPTIONKEY,
    forceDbRecreate: forceDbRecreate,
    vacuumInterval: parseInt(process.env.VACUUMINTERVAL) * 1000,
    dBLogging: dBLogging,
    dBHost: process.env.DBHOST,
    dBUser: process.env.DBUSER,
    dBPassword: process.env.DBPASSWORD,
    database: process.env.DATABASE,
    dBDialect: process.env.DBDIALECT,
    dBDialectOptions: {
      useUTC: dBdialectOptionsuseUTC, //for reading from database
    },
    dBPool: {
      max: parseInt(process.env.DBPOOLMAX),
      min: parseInt(process.env.DBPOOLMIN),
      acquire: parseInt(process.env.DBPOOLACQUIRE),
      idle: parseInt(process.env.DBPOOLIDLE),
    },
    timezone: process.env.DBTIMEZONE, //for writing to database
    nodePort: process.env.NODEPORT
  };

module.exports = config;