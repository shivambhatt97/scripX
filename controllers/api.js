const database = require('../config/mysql');

module.exports.home = async function (req, res) {
    try {
      const result = await new Promise((resolve, reject) => {
        database.query('SELECT * FROM movies', (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
  
      res.render('home', {
        title: "scripX | Home",
        data: result
      });
    } catch (err) {
      console.log(err);
    }
  };
  

module.exports.movies = function(req,res){
          let query = 'SELECT * FROM movies';
      
          if (req.query.genre) {
            const genre = req.query.genre.toLowerCase();
            query += ` WHERE LOWER(genre) = '${genre}'`;
          }
      
          if (req.query.lang) {
            const language = req.query.lang.toLowerCase();
            query += req.query.genre ? ' AND' : ' WHERE';
            query += ` LOWER(language) = '${language}'`;
          }
      
          database.query(query, (error, results) => {
            if (error) throw error;
      
            res.json({ movies: results });
          });

}
module.exports.movies = async function (req, res) {
    try {
      let query = 'SELECT * FROM movies';
  
      if (req.query.genre) {
        const genre = req.query.genre.toLowerCase();
        query += ` WHERE LOWER(genre) = '${genre}'`;
      }
  
      if (req.query.lang) {
        const language = req.query.lang.toLowerCase();
        query += req.query.genre ? ' AND' : ' WHERE';
        query += ` LOWER(language) = '${language}'`;
      }
  
      const results = await  database.query(query, (error, results) => {
        if (error) throw error;
  
        res.json({ movies: results });
      });
  
    } catch (error) {
      console.log(error);
      
    }
  };
  