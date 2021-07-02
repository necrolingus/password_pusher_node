const express = require('express')
const app = express()
app.use(express.json());
require('./routes/apiRoutes')(app);

const initDB = require("./controllers/createDb");
const vacuum = require("./controllers/vacuumDb");
const db = require("./models/mainModel");

const dbConfig = require("./config/dbConfig");

app.get("/", (req, res) => {
    return res.status(200).json({
        status: 'Hi there'
    });
});

const port = dbConfig.nodePort

app.listen(port, () => {
    console.log('Started up on port: ' + port)
    
    initDB.createDb(dbConfig.dBDialect)
        .then((err) => {
            if (err) {
                console.log('There was an error in app.listen')
                console.log(err)
                process.exit()
            }
            db.sequelize.sync({force: dbConfig.forceDbRecreate}).then(() => {
                console.log("Drop and re-sync db.");
            }).catch((err) => {
                console.log(err)
                process.exit()
            })
            vacuum.vacuumOldData() //setInterval function for continuous cleanup of old records
    }).catch((err) => {
        console.log(err)
        process.exit()
    })
})
