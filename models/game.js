const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  title: {
    type: String,
  },
  picture: {
    type: String,
  },
  resume: {
    type: String,
  },
  rating: {
    type: Array,
  },
  comments: {
    type: Array,
  },
  console: {
    type: String,
  },
  developer: {
    type: String,
  },
  genre: {
    type: String,
  },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
