require('dotenv').config()
  const mysql = require("mysql");
  
  let db_con  = mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
  });
    
  db_con.connect((err) => {
      if (err) {
        console.log("Database Connection Failed !!!", err);
      } else {
        console.log("connected to Database");
      }
  });
    
  module.exports = db_con;