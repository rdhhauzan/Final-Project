const express = require("express");
const router = express.Router();
const GameController = require("../controllers/GameController");

router.get("/", GameController.getAllGames);
router.get("/:id", GameController.getGame);

module.exports = router;
