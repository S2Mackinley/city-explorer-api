"use strict";

const Movie = require('./movieConstructor')

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
 module.exports = parseMovie;