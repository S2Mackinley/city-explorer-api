'use strict';

const superagent = require('superagent');
let cache = require('./cache.js');

function Weather(day) {
    this.forecast = day.weather.description;
    this.time = day.datetime;
}

function weatherHandler(req, res) {
    const lat = req.query.lat;
    const lon = req.query.lon;
    getWeather(lat, lon)
      .then((summaries) => {
        console.log("from weatherHandler", summaries);
        res.status(200).send(summaries);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Sorry. Something went wrong!");
      });
  }

function getWeather(latitude, longitude) {
    const key = "weather-" + latitude + longitude;
    const url = "http://api.weatherbit.io/v2.0/forecast/daily";
    const queryParams = {
      key: process.env.WEATHER_API_KEY,
      lang: "en",
      lat: latitude,
      lon: longitude,
      days: 5,
};
    // cache stays 1 hr
    if (cache[key] && Date.now() - cache[key].timestamp < 3.6e6) {
      console.log("Cache hit");
      console.log("@ getWeather", cache[key]);
    } else {
      console.log("Cache miss");
      cache[key] = {};
      cache[key].timestamp = Date.now();
      cache[key].data = superagent
        .get(url)
        .query(queryParams)
        .then((response) => parseWeather(response.body));
      console.log("@ getWeather cache miss", cache[key]);
    }
  
    return cache[key].data;
  }

  function parseWeather(weatherData) {
    try {
      const weatherSummaries = weatherData.data.map((day) => {
        return new Weather(day);
      });
      // console.log("@ parseWeather: ", weatherSummaries);
      return Promise.resolve(weatherSummaries);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  module.exports = weatherHandler;