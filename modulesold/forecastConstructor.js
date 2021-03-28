"use strict";

function Forecast(date, description, high_temp,low_temp) {
  this.date = date;
  this.description = description.to_lowercase();
  this.high_temp = Math.floor(high_temp * 9 /5 +32)
  this.low_temp = Math.floor(low_temp * 9 /5 +32)
}

module.exports = Forecast;
