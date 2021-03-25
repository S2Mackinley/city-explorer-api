"use strict";

// calling express library
const express = require("express");

// for env
require("dotenv").config();
const cors = require("cors");

// SuperAgent
const superagent = require("superagent");

// // get weather data
// const weather = require("./data/weather.json");
// const weather_data = weather.data;

// initializing express library
const app = express();
app.use(cors());
const PORT = process.env.PORT;

function Forecast(date, description) {
  this.date = date;
  this.description = description;
}

function getForecast(req, res) {
  let city = req.query.city;
  console.log(city);
  let url = `http://api.weatherbit.io/v2.0/current`;
  let queryWeather = {
    city: city,
    key: process.env.WEATHER_API_KEY,
    
  };
  superagent
    .get(url)
    .query(queryWeather)
    .then((saResults) => {
      let saData = saResults.body.data;
      console.log(saData);
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


app.get("/", function (req, res) {
  res.send("Hello World");
});
app.get("/weather", getForecast);

app.listen(PORT, () => console.log(`listening on ${PORT}`));