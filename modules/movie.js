"use strict";

let cache = require("./cache.js");
const superagent = require("superagent");
const parseMovie = require("./parseMovie");

function getMovie(title) {
  const key = "movie_setting-" + title;
  let city = req.query.movie_city;;
  let url = `https://api.themoviedb.org/3/search/movie`;
  const query = {
    api_key: process.env.MOVIE_API_KEY,
    query: city,
  };
  // cache stays for 1 week
  if (cache[key] && Date.now() - cache[key].timestamp < 6.048e8) {
    console.log("Cache hit");
    // console.log("@ getMovie", cache[key]);
  } else {
    console.log("Cache miss");
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = superagent
      .get(url)
      .query(query)
      .then((response) => parseMovie(response.body));
    // console.log("@ getMovie cache miss", cache[key]);
  }

  return cache[key].data;
}

module.exports = getMovie;