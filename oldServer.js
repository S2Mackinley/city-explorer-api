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

const PORT = process.env.PORT;


app.use(cors());


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