var config = {}

config = {
    encryptionKey: 'ujYUh7LLgaacQgtbasvzCJJg33prZiZx', //must be 32 chars or 256 bits. create env var
    vacuumInterval: 300 * 1000, //make it quite high and also maybe an env var
    logging: true,
    HOST: "localhost", //create env var
    USER: "root", //create env var
    PASSWORD: "superroot", //create env var
    DB: "testdb", //create env var
    dialect: "mysql", //create env var
    dialectOptions: {
      useUTC: true, //for reading from database
    },
    pool: {
      max: 25,
      min: 5,
      acquire: 30000,
      idle: 10000
    },
    timezone: '+00:00' //for writing to database
  };

  module.exports = config;