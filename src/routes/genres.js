"use strict";

require("dotenv").config();
const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/genres", async (req, res) => {
  try {
    const genreAPI = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.MOVIE_API_KEY}&language=en-US`;
    const genreResults = await axios.get(genreAPI);
    res.send(genreResults.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
