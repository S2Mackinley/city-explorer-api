"use strict";
const superagent = require("superagent");
const Forecast = require("./forecastConstructor.js");

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

module.exports = getForecast;