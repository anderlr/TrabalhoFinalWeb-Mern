const db = require("../models");
const auth = require("../middleware/auth");

module.exports = {
  getSavedGames: function(req, res) {
    db.Game.find({}).then(dbGameData => res.json(dbGameData)).catch(err => {
      console.log(err);
      res.json(err);
    });
  },
  saveGame: function(req, res) {
    db.Game.create(req.body).then(dbGameData => res.json(dbGameData)).catch(err => {
      console.log(err);
      res.json(err);
    });
  },
  removeGame: function(req, res) {
    db.Game.remove({
      _id: req.params.id
    }).then(dbGameData => res.json(dbGameData)).catch(err => {
      console.log(err);
      res.json(err);
    });
  },
  updateGame: function(req, res) {
    db.Game.findOneAndUpdate({ _id: req.params.id }, { $push: req.body })
    .then(dbGameData => res.json(dbGameData)).catch(err => {
      console.log(err);
      res.json(err);
    });
  }
};

