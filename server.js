"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = 3001;
const verifyUser = require("./auth/authorize");

app.use(cors());
app.use(verifyUser);
app.use(express.json());

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URL);

mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);
mongoose.connection.once("open", () => console.log("Mongoose is connected"));

const TrackedMovie = require("./models/trackedMovieSchema");
const Watchlist = require("./models/watchlistSchema");
const TopFive = require("./models/topFiveSchema");
const TopFiveModel = require("./models/topFiveSchema");

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

app.get("/tracked", async (req, res) => {
  try {
    let movieObj = {};
    if (req.query.title) movieObj.title = req.query.title;
    const savedMovies = await TrackedMovie.find({});
    res.status(200).json(savedMovies);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/tracked", async (req, res) => {
  try {
    const movie = await TrackedMovie.create(req.body);
    res.status(201).send(movie);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/tracked/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await TrackedMovie.findByIdAndDelete(id);
    res.status(201).send("reviewed movie deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/tracked/:id", async (req, res) => {
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

app.get("/topFive", async (req, res) => {
  try {
    const userTopFive = await TopFiveModel.find({});
    res.status(200).send(userTopFive);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/topFive", async (req, res) => {
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

app.put(`/topFive`, async (req, res) => {
  const favoriteFilms = req.body.favoriteFilms;

  try {
    await TopFiveModel.deleteMany({});

    const updatedTopFive = await TopFiveModel.insertMany(favoriteFilms);

    res.status(201).send(updatedTopFive);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put(`/topFive/:id`, async (req, res) => {
  const id = req.params.id;
  const { label, poster_path } = req.body;

  try {
    const updateTopFive = await TopFiveModel.findByIdAndUpdate(
      id,
      { $set: { label, poster_path } },
      { new: true }
    );

    res.status(201).send(updateTopFive);
  } catch (error) {
    res.status(500).send(error);
  }
});


app.listen(PORT, () => console.log(`listening on ${PORT}🍿`));
