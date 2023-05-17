"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = 3001;
const verifyUser = require('./auth/authorize')

app.use(cors());
app.use(verifyUser)
app.use(express.json());

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URL);

mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);
mongoose.connection.once("open", () => console.log("Mongoose is connected"));

const SavedMovie = require("./models/savedMovieSchema");
const Watchlist = require("./models/watchlistSchema");

app.get("/movies", async (req, res) => {
  try {
    const title = req.query.title;
    const movieAPI = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${title}`;
    const movieResults = await axios.get(movieAPI);
    res.send(movieResults.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/reviews", async (req, res) => {
  try {
    let movieObj = {};
    if (req.query.title) movieObj.title = req.query.title;
    const savedMovies = await SavedMovie.find({});
    res.status(200).json(savedMovies);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/reviews", async (req, res) => {
  try {
    const movie = await SavedMovie.create(req.body);
    res.status(201).send(movie);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/reviews/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await SavedMovie.findByIdAndDelete(id);
    res.status(201).send("reviewed movie deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/reviews/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updateReview = await SavedMovie.findByIdAndUpdate(id, req.body, {
      new: true,
      overwrite: true,
    });
    res.status(201).send(updateReview);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/watchlist", async (req, res) => {
  try {
    let watchlistObj = {};
    if (req.query.title) watchlistObj.title = req.query.title;
    const watchlist = await Watchlist.find({});
    res.status(200).json(watchlist);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/watchlist", async (req, res) => {
  try {
    const movie = await Watchlist.create(req.body);
    res.status(201).send(movie);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/watchlist/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Watchlist.findByIdAndDelete(id);
    res.status(201).send("removed from watchlist");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => console.log(`listening on ${PORT}🍿`));
