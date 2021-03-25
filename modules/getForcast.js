"use strict";
const superagent = require("superagent");
const Forecast = require("./forecastConstructor.js");

function getForecast(req, res) {
  let { lat, lon } = req.query;
  // console.log(lat, lon);
  let url = `https://api.weatherbit.io/v2.0/forecast/daily`;
  let queryWeather = {
    key: process.env.WEATHER_API_KEY,
    lat: lat,
    lon: lon,
    days: 10,
  };
  superagent
    .get(url)
    .query(queryWeather)
    .then((saResults) => {
      let saData = saResults.body.data;
      let forecastArr = saData.map(
        (x) => new Forecast(x.datetime, x.weather.description)
      );
      // console.log(saResults.body);
      res.status(200).send({
        longitude: lon,
        latitude: lat,
        forecast: forecastArr,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}
module.exports = getForecast;