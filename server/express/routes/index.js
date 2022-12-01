const express = require("express");
const router = express.Router();
const usersRoute = require("./usersRoute");
const gamesRoute = require("./gamesRoute");
const userGamesRoute = require("./userGamesRoute");
router.use("/users", usersRoute);
router.use("/games", gamesRoute);
router.use("/usergames", userGamesRoute);
module.exports = router;
