const router = require("express").Router();
const gameController = require("../../controllers/gameController");
const auth = require("../../middleware/auth");

router.route("/")
    .get(gameController.getSavedGames)
    .post(gameController.saveGame);

router.route("/:id")
    .delete( gameController.removeGame)
    .put(gameController.updateGame);

module.exports = router;