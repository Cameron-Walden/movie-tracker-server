"use strict";

const express = require("express");
const cors = require("cors");
const app = express();
const verifyUser = require("./src/auth/authorize");
const movieRouter = require("./src/routes/movies");
const trackedRouter = require("./src/routes/tracked");
const watchlistRouter = require("./src/routes/watchlist");
const topFiveRouter = require("./src/routes/topFive");
const listRouter = require("./src/routes/lists");
const notFoundHandler = require("./src/error-handlers/404");
const errorHandler = require("./src/error-handlers/500");

const connectDB = require("./src/db");

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(verifyUser);
app.use(express.json());

connectDB();

app.use(movieRouter)
app.use(trackedRouter)
app.use(watchlistRouter)
app.use(topFiveRouter)
app.use(listRouter)

app.use("*", notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => console.log(`listening on ${PORT}🍿`));