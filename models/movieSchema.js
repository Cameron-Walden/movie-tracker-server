const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new Schema({
    title: { type: String },
    description: { type: String },
    poster: { type: String },
    user_review: { type: String },
    user_rating: { type: Number },
    date_watched: { type: Date },
    release_date: {type: String},
    liked: { type: Boolean }
});

const MovieModel = mongoose.model('Movie', movieSchema);

module.exports = MovieModel;