"use strict";

require("dotenv").config();
const express = require("express");
const router = express.Router();

const TrackedMovie = require("../models/trackedMovieSchema");

router.get("/tracked", async (req, res) => {
  try {
    let movieObj = {};
    if (req.query.title) movieObj.title = req.query.title;
    const savedMovies = await TrackedMovie.find({});
    res.status(200).json(savedMovies);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/tracked", async (req, res) => {
  try {
    const movie = await TrackedMovie.create(req.body);
    res.status(201).send(movie);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/tracked/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await TrackedMovie.findByIdAndDelete(id);
    res.status(201).send("reviewed movie deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/tracked/:id", async (req, res) => {
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
