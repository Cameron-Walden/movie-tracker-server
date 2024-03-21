const mongoose = require("mongoose");
const { movieSchema } = require("./movieSchema");
const { Schema } = mongoose;

const listSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  movies: [movieSchema],
  user: { type: String, required: true },
});

const listModel = mongoose.model("Lists", listSchema);

module.exports = listModel;
