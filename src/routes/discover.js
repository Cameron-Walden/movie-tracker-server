"use strict";

require("dotenv").config();
const express = require("express");
const axios = require("axios");
const router = express.Router();
const NodeCache = require("node-cache");
const myCache = new NodeCache();

router.get("/discover/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const cacheKey = `discover-${id}`;
    const cachedData = myCache.get(cacheKey);

    if (cachedData) {
      res.send(cachedData);
    } else {
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
      if (id !== "undefined") {
        url += `&with_genres=${id}`;
      }
      const movieResults = await axios.get(url);
      myCache.set(cacheKey, movieResults.data, 60 * 60 * 24);
      res.send(movieResults.data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
