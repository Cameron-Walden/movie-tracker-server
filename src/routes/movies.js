"use strict";

require("dotenv").config();
const express = require("express");
const axios = require("axios");
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

router.get("/movies/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const movieAPI = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.MOVIE_API_KEY}`;
    const movieResults = await axios.get(movieAPI);

    res.send(movieResults.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/movies/:id/credits", async (req, res) => {
  try {
    const id = req.params.id;
    const credits = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.MOVIE_API_KEY}`
    );
    res.send(credits.data);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
