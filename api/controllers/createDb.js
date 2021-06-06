const mysql = require('mysql2/promise');
const dbConfig = require("../config/dbConfig");


async function createDb (dialect) {
    if (dialect === 'mysql'){
        try {
            var connection = await mysql.createConnection({
                user: dbConfig.USER,
                password: dbConfig.PASSWORD,
                host: dbConfig.HOST
            });
        } catch (err) {
            return err
        }

        try {
            await connection.query('CREATE DATABASE IF NOT EXISTS ' + dbConfig.DB + ';')
        } catch (err) {
            await connection.end();
            return err
        }
    }
}

module.exports.createDb = createDb;