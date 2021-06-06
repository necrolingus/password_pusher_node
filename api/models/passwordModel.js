module.exports = (sequelize, Sequelize) => {
  const passwordModel = sequelize.define("passwordModel", {
    uniqueId: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    password: {
      type: Sequelize.STRING
    },
    hoursToLive: {
      type: Sequelize.STRING
    },
    viewsToLive: {
      type: Sequelize.INTEGER
    }
  });

  return passwordModel;
};