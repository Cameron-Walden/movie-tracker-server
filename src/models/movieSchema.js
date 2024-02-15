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
    tmdb_id: {type: Number},
    liked: { type: Boolean }
});

const movieModel = mongoose.model('Movie', movieSchema);

module.exports = { movieModel, movieSchema }