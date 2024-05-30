"use strict";

require("dotenv").config();
const express = require("express");
const router = express.Router();
const TrackedMovie = require("../models/trackedMovieSchema");
const NodeCache = require("node-cache");
const myCache = new NodeCache();

router.get("/", async (req, res) => {
  try {
    const cacheKey = "trackedMovies";
    const cachedData = myCache.get(cacheKey);
    if (cachedData) {
      res.send(cachedData);
    } else {
      let movieObj = {};
      if (req.query.title) movieObj.title = req.query.title;
      const savedMovies = await TrackedMovie.find({});
      myCache.set(cacheKey, savedMovies, 60 * 60 * 24);
      res.status(200).json(savedMovies);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const movie = await TrackedMovie.create(req.body);
    res.status(201).send(movie);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await TrackedMovie.findByIdAndDelete(id);
    res.status(201).send("reviewed movie deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updateReview = await TrackedMovie.findByIdAndUpdate(id, req.body, {
      new: true,
      overwrite: true,
    });
    res.status(201).send(updateReview);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
