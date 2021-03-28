"use strict";
const superagent = require("superagent");
const Movie = require("./movieConstructor.js");

function getMovies(req, res) {
  let url = `https://api.themoviedb.org/3/search/movie`;
  // finds first word in returned string of address
  //   let regex = /\w*\b/;
  let regex = /^([^,])+/;
  let title = req.query.title.match(regex)[0];
  // console.log(title);
  let queryMovie = {
    api_key: process.env.MOVIE_API_KEY,
    query: title,
  };
  superagent
//   console.log('testing')
    .get(url)
    .query(queryMovie)
    .then((saResults) => {
      let saData = saResults.body.results;
      let movieArr = saData.map(
        (x) =>
          new Movie(
            x.title,
            x.overview,
            x.vote_average,
            x.vote_count,
            x.poster_path,
            x.popularity,
            x.release_date
          )
      );
      //   console.log(movieArr);
      res.status(200).send(movieArr);
    })
    .catch((err) => {
        console.log('inside 500 catch')
      res.status(500).send(err);
    });
}

module.exports = getMovies;