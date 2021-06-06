const mysql = require('mysql2/promise');
const dbConfig = require("../config/dbConfig");


async function createDb (dialect) {
    if (dialect === 'mysql'){
        try {
            var connection = await mysql.createConnection({
                user: dbConfig.dBUser,
                password: dbConfig.dBPassword,
                host: dbConfig.dBHost
            });
        } catch (err) {
            return err
        }

        try {
            await connection.query('CREATE DATABASE IF NOT EXISTS ' + dbConfig.database + ';')
            
        } catch (err) {
            await connection.end();
            return err
        }
    }
    else{
        return 'createDB dialect not defined'
    }
}

module.exports.createDb = createDb;