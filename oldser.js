"use strict";

// calling express library
const express = require("express");
// for env
require("dotenv").config();
const cors = require("cors");

// Import Modules
const getForecast = require("./old/getForcast");
const getMovies = require("./old/getMovies");

// initializing express library
const app = express();
app.use(cors());
const PORT = process.env.PORT;

app.get("/", function (req, res) {
  res.send("Hello World");
});
app.get("/weather", getForecast);
app.get("/movies", getMovies);
app.get("*", function (req, res) {
  res.status(404).send("Error: Page not found 404");
});
app.listen(PORT, () => console.log(`listening on ${PORT}`));