const mysql = require('mysql2');
//const router = require('../routes/users');

const pool = mysql.createPool({
    connectionLimit: 50,
    host: "localhost",
    user: "antonio",
    password: "21305",
    database: "mycscdb",
    debug: false,
    
});


const promisePool = pool.promise()

module.exports = promisePool;