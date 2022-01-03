const mysql = require('mysql2');

const pool = mysql.createPool({
    host : 'localhost',
    user: 'root',
    database: 'flight_1',
    password: 'admin'
})


module.exports = pool.promise();
