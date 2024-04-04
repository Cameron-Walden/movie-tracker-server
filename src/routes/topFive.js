"use strict";

require("dotenv").config();
const express = require("express");
const router = express.Router();
const TopFive = require("../models/topFiveSchema");

router.get("/", async (req, res) => {
  try {
    const userTopFive = await TopFive.find({});
    res.status(200).send(userTopFive);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const favoriteFilms = req.body.favoriteFilms;
    const createdMovies = [];

    for (const film of favoriteFilms) {
      const { label, poster_path, id } = film;
      const movieData = { label, poster_path, id };

      let movie = await TopFive.findOne({ id: movieData.id });

      if (!movie) {
        movie = await TopFive.create(movieData);
      }

      createdMovies.push(movie);
    }

    res.status(201).send(createdMovies);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put(`/`, async (req, res) => {
  const favoriteFilms = req.body.favoriteFilms;

  try {
    await TopFive.deleteMany({});

    const updatedTopFive = await TopFive.insertMany(favoriteFilms);

    res.status(201).send(updatedTopFive);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put(`/:id`, async (req, res) => {
  const id = req.params.id;
  const { label, poster_path } = req.body;

  try {
    const updateTopFive = await TopFive.findByIdAndUpdate(
      id,
      { $set: { label, poster_path } },
      { new: true }
    );

    res.status(201).send(updateTopFive);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;