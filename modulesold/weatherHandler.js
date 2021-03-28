"use strict";

const weather = require("./weather");

function weatherHandler(req, res) {
  const lat = req.query.lat;
  const lon = req.query.lon;
  weather(lat, lon)
    .then((summaries) => {
      console.log("from weatherHandler", summaries);
      res.status(200).send(summaries);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Sorry. Something went wrong!");
    });
}

module.exports = weatherHandler;
