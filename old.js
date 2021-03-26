"use strict";
// for env
require("dotenv").config();
// calling express library
const express = require("express");
// initializing express library
const app = express();
// its a coars party
const cors = require("cors");
// SuperAgent
const superagent = require("superagent");
//connects port
const PORT = process.env.PORT;


app.use(cors());


function Forecast(date, description) {
  this.date = date;
  this.description = description;
}

function getForecast(req, res) {
  let city = req.query.city;
  let url = `http://api.weatherbit.io/v2.0/forecast/daily`;
  let queryWeather = {
    city: city,
    key: process.env.WEATHER_API_KEY,
    
  };
  superagent
    .get(url)
    .query(queryWeather)
    .then((saResults) => {
      let saData = saResults.body.data;
      let forecastArr = saData.map(
        (x) => new Forecast(x.datetime, x.weather.description)
      );
      res.status(200).send({
        longitude: saData.lon,
        latitude: saData.lat,
        forecast: forecastArr,
      });
    });
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

function getMovies(req, res) {
  let url = `https://api.themoviedb.org/3/search/movie`;
  let title = req.query.movie_city;
  // console.log('getMovies:', req.query.movie_city);
  let queryMovie = {
    api_key: process.env.MOVIE_API_KEY,
    query: title,
  };
  superagent
    .get(url)
    .query(queryMovie)
    .then((saResults) => {
      let saData = saResults.body.results;
      // console.log('saData:', saData);
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







app.get("/", function (req, res) {
  res.send("Hello World");
});
app.get("/weather", getForecast);

app.get("/movies", getMovies);

app.listen(PORT, () => console.log(`listening on ${PORT}`));