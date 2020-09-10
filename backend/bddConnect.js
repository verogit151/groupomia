require('dotenv').config()
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB = process.env.DB

const mysql      = require('mysql')

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : DB_USER,
  password : DB_PASSWORD,
  database : DB
})
 
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
})

module.exports = connection