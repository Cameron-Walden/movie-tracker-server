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
const genresRouter = require("./src/routes/genres");
const discoverRouter = require("./src/routes/discover");
const notFoundHandler = require("./src/error-handlers/404");
const errorHandler = require("./src/error-handlers/500");

const connectDB = require("./src/db");

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

connectDB();

app.use(movieRouter);
app.use(genresRouter);
app.use(discoverRouter);
app.use("/tracked", verifyUser, trackedRouter);
app.use("/watchlist", verifyUser, watchlistRouter);
app.use("/topFive", verifyUser, topFiveRouter);
app.use("/lists", verifyUser, listRouter);

app.use("*", notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => console.log(`listening on ${PORT}🍿`));
