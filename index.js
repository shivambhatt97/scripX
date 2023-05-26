const express = require("express");
const database = require('./config/mysql');
const csv = require('csv-parser');
const fs = require('fs');
const ejs=require('ejs');
const bodyParser=require('body-parser');
const app = express();
const expressLayouts = require('express-ejs-layouts');
app.use(express.urlencoded());
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true}));

//extract style and script from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setup the view engine
app.set('view engine','ejs');
app.set('views','./views');

//use express router
app.use('/',require('./routes'));

// Uploding csv file to database through scripting
const csvFilePath = 'IMDb-movies.csv';
const checkTableQuery = `SHOW TABLES LIKE 'movies'`;
database.query(checkTableQuery, (err, result) => {
  if (err) throw err;

  if (result.length === 0) {
    fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('headers', (headers) => {
      const tableColumns = headers.map((header) => `${header} VARCHAR(255)`);
      const createTableQuery = `CREATE TABLE IF NOT EXISTS movies (${tableColumns.join(', ')})`; 
      database.query(createTableQuery, (err, result) => {
        if (err) console.log(err);
      });
    })
    .on('data', (data) => {
      const insertQuery = 'INSERT INTO movies SET ?'; 
      database.query(insertQuery, data, (err, result) => {
        if (err) console.log(err);
      });
    })
    .on('end', () => {
      console.log('Data imported successfully.');
      // database.end(); 
    });

  }else {
        // Table already exists, skip data import
        console.log('Table already exists. Data import skipped.');
        // database.end(); // Close the database connection
      }
    });



// app.get("/", (req, res) => {
//     res.send('Hello World');
// });
 




// server listing at 5000
app.listen(5000, () => {
  console.log(`Server is up and running on 5000 ...`);
});