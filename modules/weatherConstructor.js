"use strict";

function Weather(day) {
  this.forecast = day.weather.description;
  this.time = day.datetime;
}

module.exports = Weather;