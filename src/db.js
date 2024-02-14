"use strict";

require("dotenv").config();
const mongoose = require("mongoose");

function connectDB() {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.DB_URL);

  mongoose.connection.on(
    "error",
    console.error.bind(console, "connection error:")
  );
  mongoose.connection.once("open", () => console.log("Mongoose is connected"));
}

module.exports = connectDB;