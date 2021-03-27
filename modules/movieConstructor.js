"use strict";

class Movie {
  constructor(film) {
    this.title = film.title;
    this.overview = film.overview;
    this.average_votes = film.vote_average;
    this.total_votes = film.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w300${film.poster_path}`;
    this.popularity = film.popularity;
    this.released_on = film.release_date;
  }
}
module.exports = Movie;