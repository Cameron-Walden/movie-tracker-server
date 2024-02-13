"use strict";

require("dotenv").config();
const express = require("express");
const router = express.Router();

const Watchlist = require("../models/watchlistSchema");

router.get("/watchlist", async (req, res) => {
  try {
    let watchlistObj = {};
    if (req.query.title) watchlistObj.title = req.query.title;
    const watchlist = await Watchlist.find({});
    res.status(200).json(watchlist);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/watchlist", async (req, res) => {
  try {
    const movie = await Watchlist.create(req.body);
    res.status(201).send(movie);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/watchlist/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Watchlist.findByIdAndDelete(id);
    res.status(201).send("removed from watchlist");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
