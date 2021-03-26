"use strict";

function Movie(title, overview, vote_average, vote_count, poster_path, popularity, release_date) {
  this.title = title;
  this.overview = overview;
  this.average_votes = vote_average;
  this.total_votes = vote_count;
  this.image_url = poster_path;
  this.popularity = popularity;
  this.released_on = release_date;
}

module.exports = Movie;