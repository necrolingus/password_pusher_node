const passwordController = require("../controllers/passwordController");
const dbConfig = require("../config/dbConfig");

exports.vacuumOldData = () => {
    setInterval(() => {
        passwordController.deleteAllOld()
    }, dbConfig.vacuumInterval);
}