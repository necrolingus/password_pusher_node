const express = require('express')
const app = express()
app.use(express.json());
require('./routes/apiRoutes')(app);
const port = 3000

const initDB = require("./controllers/createDb");
const vacuum = require("./controllers/vacuumDb");
const db = require("./models/mainModel");


app.get("/", (req, res) => {
    return res.status(200).json({
        status: 'Hi there'
    });
});


app.listen(port, () => {
    console.log('Started up on port: '.concat(port))
    
    initDB.createDb('mysql')
        .then((err) => {
            if (err) {
                console.log('There was an error in app.listen')
                console.log(err)
                process.exit()
            }
            db.sequelize.sync({force: false}).then(() => {
            console.log("Drop and re-sync db.");
        })
        vacuum.vacuumOldData() //setInterval function for continuous cleanup of old records
    })
})

    




