"use strict";

require("dotenv").config();
const express = require("express");
const axios = require("axios");
const router = express.Router();
const NodeCache = require("node-cache");
const myCache = new NodeCache();

router.get("/genres", async (req, res) => {
  try {
    const cacheKey = "genres";
    const cachedData = myCache.get(cacheKey);

    if (cachedData) {
      res.send(cachedData);
    } else {
      const genreAPI = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.MOVIE_API_KEY}&language=en-US`;
      const genreResults = await axios.get(genreAPI);
      myCache.set(cacheKey, genreResults.data, 60 * 60 * 24);
      res.send(genreResults.data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
