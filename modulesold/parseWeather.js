"use strict";
const Weather = require("./weatherConstructor");

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

module.exports = parseWeather;