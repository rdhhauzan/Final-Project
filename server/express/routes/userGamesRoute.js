const express = require("express");
const router = express.Router();
const UserGameController = require("../controllers/UserGameController");

router.get("/", UserGameController.getAllUserGames);
router.get("/:id", UserGameController.getUserGame);
router.post("/", UserGameController.createUserGame);
router.put("/:id", UserGameController.editUserGame);

module.exports = router;
