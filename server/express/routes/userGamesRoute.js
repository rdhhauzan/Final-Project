const express = require("express");
const router = express.Router();
const UserGameController = require("../controllers/UserGameController");

router.get("/", UserGameController.getAllUserGames);
router.get("/:id", UserGameController.getUserGame);
router.post("/:id", UserGameController.createUserGame);
router.put("/:id", UserGameController.editUserGame);
router.get("/match/:id", UserGameController.matchmake);

module.exports = router;
