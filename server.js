'use strict';

// bring in the express libraray
// don't forget to do an npm install express
const express = require('express');
//allows us to access our env variables
require('dotenv').config();
//allow our front-end to access our server
const cors = require('cors');
// initalizing the express library so I can use it
const app = express();
//weather
const weather = require('./weather.json');
//this allows anyone to access our server - aka - the worlds worst body guard
app.use(cors());
const PORT = process.env.PORT || 3001;
app.get('/', function (request, response) {
    response.send('Hello World');
});




app.get('/weather', handleWeather);

function handleWeather(request, response) {
  let forecastArray = weather.data.map(day => {
    return new Forecast(day,weather.city_name,weather.lat,weather.lon)
  })
  response.status(200).send(forecastArray)

}

function Forecast(obj, city, lat, lon) {
  this.description = obj.weather.description;
  this.date = obj.datetime;
  this.city = city;
  this.lat = lat;
  this.lon = lon;
}



// turn on the server
app.listen(PORT, () => console.log(`listening on ${PORT}`));

console.log
// three ways to do it:
// 1. node server.js
// 2. npm start
// 3. nodemon - this is going to check for changes and update