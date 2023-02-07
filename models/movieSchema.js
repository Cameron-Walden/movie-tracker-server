const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new Schema({
    title: { type: String },
    description: { type: String },
    user_review: { type: String },
    user_rating: { type: Number },
    date_watched: { type: Date },
    liked: { type: Boolean }
});

const MovieModel = mongoose.model('Movie', movieSchema);

module.exports = MovieModel;