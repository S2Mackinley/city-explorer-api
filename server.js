"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const weatherHandler = require("./modules/weatherHandler.js");
const movieHandler = require("./modules/movieHandler");
const app = express();
app.use(cors());
const PORT = process.env.PORT;

// // ==========================  My Code Remove Later!!! ====================================

app.get("/", function (req, res) {
  res.send("Hello World");
});
// // ========================================================================================

app.get("/movies", movieHandler);
app.get("/weather", weatherHandler);

app.listen(PORT, () => console.log(`Server up on ${PORT}`));