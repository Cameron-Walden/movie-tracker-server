const mongoose = require('mongoose');
const { Schema } = mongoose;

const watchlistSchema = new Schema({
    title: { type: String },
    description: { type: String },
    poster: { type: String },
    watched: {type: Boolean}
});

const MovieModel = mongoose.model('Watchlist', watchlistSchema);

module.exports = MovieModel;