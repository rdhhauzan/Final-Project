const express = require("express");
const router = express.Router();
const UserGameController = require("../controllers/UserGameController");

router.get("/", UserGameController.getAllUserGames);
router.get("/:id", UserGameController.getUserGame);

module.exports = router;
