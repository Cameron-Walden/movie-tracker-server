"use strict";

require("dotenv").config();
const express = require("express");
const router = express.Router();
const Watchlist = require("../models/watchlistSchema");
const NodeCache = require("node-cache");
const myCache = new NodeCache();

router.get("/", async (req, res) => {
  try {
    const cacheKey = "watchlist";
    const cachedData = myCache.get(cacheKey);

    if (cachedData) {
      res.send(cachedData);
    } else {
      let watchlistObj = {};
      if (req.query.title) watchlistObj.title = req.query.title;
      const watchlist = await Watchlist.find({});
      myCache.set(cacheKey, watchlist, 60 * 60 * 24);
      res.status(200).json(watchlist);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


router.post("/", async (req, res) => {
  try {
    const movie = await Watchlist.create(req.body);
    myCache.del("watchlist"); 
    res.status(201).send(movie);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Watchlist.findByIdAndDelete(id);
    myCache.del("watchlist"); 
    res.status(201).send("removed from watchlist");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;