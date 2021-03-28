'use strict';
let cache = require('./cache.js');
const superagent = require('superagent');


function Movie(title, overview, vote_average, vote_count, poster_path, popularity, release_date) {
    this.title = title;
    this.overview = overview;
    this.average_votes = vote_average;
    this.total_votes = vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500/${poster_path}`;
    this.popularity = popularity;
    this.released_on = release_date;
  }

function movieHandler(request, response){
    getMovies(request.query.location)
        .then(summaries => response.send(summaries))
        .catch((error) => {
        console.error(error);
        response.status(500).send('Sorry. Something went wrong with your movie request.');
        });
}


function getMovies(location) {
  const key = 'movies-' + location;
  const url = 'https://api.themoviedb.org/3/search/movie';
  const queryParams = {
    api_key: process.env.MOVIE_API_KEY,
    query: location,
  };

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = superagent
      .get(url)
      .query(queryParams)
      .then(response => parseMovies(response.body.results));
  }
  console.log(cache);
  return cache[key].data;
}


  function parseMovie(movieData) {
    try {
      const movieSummaries = movieData.results.map((film) => {
        return new Movie(film);
      });
      // console.log("@ parseWeather: ", weatherSummaries);
      return Promise.resolve(movieSummaries);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  function Movie(title, overview, vote_average, vote_count, poster_path, popularity, release_date) {
    this.title = title;
    this.overview = overview;
    this.average_votes = vote_average;
    this.total_votes = vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500/${poster_path}`;
    this.popularity = popularity;
    this.released_on = release_date;
  }

  module.exports = movieHandler;