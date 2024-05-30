"use strict";

require("dotenv").config();
const express = require("express");
const router = express.Router();
const List = require("../models/listSchema");
const NodeCache = require("node-cache");
const myCache = new NodeCache();

router.get("/", async (req, res) => {
  try {
    const cacheKey = "lists";
    const cachedData = myCache.get(cacheKey);

    if (cachedData) {
      res.send(cachedData);
    } else {
      const lists = await List.find({});
      myCache.set(cacheKey, lists, 60 * 60 * 24);
      res.status(200).send(lists);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newList = new List(req.body);
    const result = await newList.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
