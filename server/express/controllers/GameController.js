const { Game, UserGame, Post } = require("../models/index");
class GameController {
  static async getAllGames(req, res, next) {
    try {
      const games = await Game.findAll();
      res.status(200).json(games);
    } catch (error) {
      next(error);
    }
  }
  static async getGame(req, res, next) {
    try {
      const { id } = req.params;
      const game = await Game.findByPk(id);
      if (!game) {
        throw { name: "NOT_FOUND" };
      }
      res.status(200).json(game);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GameController;
