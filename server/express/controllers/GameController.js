const { Game, UserGame, Post } = require("../models/index");
class GameController {
  static async getAllGames(req, res) {
    try {
      const games = await Game.findAll();
      res.status(200).json(games);
    } catch (error) {
      console.log(error);
    }
  }
  static async getGame(req, res) {
    try {
      const { id } = req.params;
      const game = await Game.findByPk(id);
      if (!game) throw { name: "GAME_NOT_FOUND" };
      res.status(200).json(game);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = GameController;
