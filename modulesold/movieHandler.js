"use strict";

const movie = require("./movie");

function movieHandler(req, res) {
  const title = req.query.title;
  movie(title)
    .then((summaries) => {
      //   console.log('from movieHandler',summaries)
      res.status(200).send(summaries);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Sorry. Something went wrong!");
    });
}

module.exports = movieHandler;
