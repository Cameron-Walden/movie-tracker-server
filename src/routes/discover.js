"use strict";

require("dotenv").config();
const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/discover/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
    if (id !== "undefined") {
      url += `&with_genres=${id}`;
    }
    const movieResults = await axios.get(url);
    res.send(movieResults.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
