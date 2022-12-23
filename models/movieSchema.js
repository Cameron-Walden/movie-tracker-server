const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new Schema({
    title: { type: String },
    description: { type: String },
});

const MovieModel = mongoose.model('Movie', movieSchema);

module.exports = MovieModel;