"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = 3001;

app.use(cors());

app.use(express.json());

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URL);

mongoose.connection.on("error", console.error.bind(console, "connection error:"));
mongoose.connection.once("open", () => console.log("Mongoose is connected"));

app.get('/movies', async (req, res) => {
  try {
    const cityName = req.query.title;
    const movieAPI = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`;
    const movieResults = await axios.get(movieAPI)
    res.send(movieResults.data)
  } catch (error) {
    res.status(500).send(error)
  }
});

app.listen(PORT, () => console.log(`listening on ${PORT}🍿`));
