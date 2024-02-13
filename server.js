"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;
const verifyUser = require("./src/auth/authorize");
const movieRouter = require("./src/routes/movies");
const trackedRouter = require("./src/routes/tracked");
const watchlistRouter = require("./src/routes/watchlist");
const topFiveRouter = require("./src/routes/topFive");

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

app.use(movieRouter)
app.use(trackedRouter)
app.use(watchlistRouter)
app.use(topFiveRouter)

app.listen(PORT, () => console.log(`listening on ${PORT}🍿`));