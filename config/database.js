const mysql = require('mysql2');
//const router = require('../routes/users');

const pool = mysql.createPool({
    connectionLimit: 50,
    host: "us-cdbr-east-03.cleardb.com",
    user: "bcea64701dcc25",
    password: "e7cabbab",
    database: "heroku_b2df9c444c6ecef",
    debug: false,
    
});


const promisePool = pool.promise()

module.exports = promisePool;