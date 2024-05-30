"use strict";

require("dotenv").config();
const express = require("express");
const axios = require("axios");
const router = express.Router();
const NodeCache = require("node-cache");
const myCache = new NodeCache();

router.get("/movies", async (req, res) => {
  try {
    const title = req.query.title;
    const page = req.query.page || 1;

    const cacheKey = `movies-${title}-${page}`;
    const cachedData = myCache.get(cacheKey);

    if (cachedData) {
      res.send(cachedData);
    } else {
      const movieAPI = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${title}&page=${page}`;
      const movieResults = await axios.get(movieAPI);
      myCache.set(cacheKey, movieResults.data, 60 * 60 * 24);
      res.send(movieResults.data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/movies/popular", async (req, res) => {
  try {
    const cacheKey = "popular-movies";
    const cachedData = myCache.get(cacheKey);

    if (cachedData) { 
      res.send(cachedData);
    } else {
      const p1Res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_API_KEY}&page=1`
      );
      const p2Res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_API_KEY}&page=2`
      );
      const p3Res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_API_KEY}&page=3`
      );

      const results = [
        ...p1Res.data.results,
        ...p2Res.data.results,
        ...p3Res.data.results,
      ];
      myCache.set(cacheKey, results, 60 * 60 * 24);
      res.send(results);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/movies/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const cacheKey = `movie-${id}`;
    const cachedData = myCache.get(cacheKey);

    if (cachedData) {
      res.send(cachedData);
    } else {
      const movieAPI = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.MOVIE_API_KEY}`;
      const movieResults = await axios.get(movieAPI);

      myCache.set(cacheKey, movieResults.data, 60 * 60 * 24);
      res.send(movieResults.data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/movies/:id/credits", async (req, res) => {
  try {
    const id = req.params.id;

    const cacheKey = `credits-${id}`;
    const cachedData = myCache.get(cacheKey);

    if (cachecdData) {
      res.send(cachedData);
    } else {
      const credits = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.MOVIE_API_KEY}`
      );
      myCache.set(cacheKey, credits.data, 60 * 60 * 24);
      res.send(credits.data);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/movies/:id/recommendations", async (req, res) => {
  try {
    const id = req.params.id;

    const cacheKey = `recommendations-${id}`;
    const cachedData = myCache.get(cacheKey);

    if (cachedData) {
      res.send(cachedData);
    } else {
      const similar = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.MOVIE_API_KEY}`
      );
      myCache.set(cacheKey, similar.data, 60 * 60 * 24);
      res.send(similar.data);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
