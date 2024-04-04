"use strict";

require("dotenv").config();
const express = require("express");
const router = express.Router();
const List = require("../models/listSchema");

router.get("/", async (req, res) => {
  try {
    const lists = await List.find({});
    res.status(200).send(lists);
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
