const mysql = require('mysql2');


// connect to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'enter password here',
  database: 'catalog'
},
console.log('Connected to database!')
);


module.exports = db;