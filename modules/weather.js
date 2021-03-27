"use strict";

let cache = require("./cache.js");
const superagent = require("superagent");
const parseWeather = require("./parseWeather");

function getWeather(latitude, longitude) {
  const key = "weather-" + latitude + longitude;
  const url = "http://api.weatherbit.io/v2.0/forecast/daily";
  const queryParams = {
    key: process.env.WEATHER_API_KEY,
    lang: "en",
    lat: latitude,
    lon: longitude,
    days: 8,
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
module.exports = getWeather;