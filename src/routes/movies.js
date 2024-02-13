"use strict";

require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
const router = express.Router();

router.get("/movies", async (req, res) => {
  try {
    const title = req.query.title;
    const movieAPI = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${title}`;
    const movieResults = await axios.get(movieAPI);
    res.send(movieResults.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
