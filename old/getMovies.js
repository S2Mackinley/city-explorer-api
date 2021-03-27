"use strict";
const superagent = require("superagent");
const Movie = require("./movieConstructor.js");

function getMovies(req, res) {
  let url = `https://api.themoviedb.org/3/search/movie`;
  let title = req.query.movie_city;
  let queryMovie = {
    api_key: process.env.MOVIE_API_KEY,
    query: title,
  };
  superagent
    .get(url)
    .query(queryMovie)
    .then((saResults) => {
      let saData = saResults.body.results;
       let movieRa = saData.map((x) => {
        //  console.log(x);
         return new Movie(x.title, x.overview, x.vote_average, x.vote_count, x.poster_path, x.popularity, x.release_date)
       });
      // console.log('movieArr', movieArr);
      res.status(200).send(movieRa);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}


module.exports = getMovies;