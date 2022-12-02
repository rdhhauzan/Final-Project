const express = require("express");
const router = express.Router();
const loginAuth = require("../middlewares/authentication");
const usersRoute = require("./usersRoute");
const gamesRoute = require("./gamesRoute");
const userGamesRoute = require("./userGamesRoute");
const errorHandler = require("../middlewares/errorHandler");
router.use("/users", usersRoute);
router.use("/games", gamesRoute);
router.use(loginAuth);
router.use("/usergames", userGamesRoute);

router.use(errorHandler)

module.exports = router;
