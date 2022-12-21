const router = require("express").Router();
const gameRoutes = require("./games");
const userRoutes = require("./users");
const authRoutes = require("./auth")

router.use("/games", gameRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);

module.exports = router;
