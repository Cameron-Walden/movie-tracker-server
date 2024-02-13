const mongoose = require("mongoose");
const { Schema } = mongoose;

const topFiveSchema = new Schema({
  label: { type: String },
  poster_path: { type: String },
  id: { type: Number }
});

const TopFiveModel = mongoose.model("TopFive", topFiveSchema);

module.exports = TopFiveModel;
