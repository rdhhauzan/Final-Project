const { Game, UserGame, User } = require("../models/index");

class UserGameController {
  static async getAllUserGames(req, res) {
    const { id } = req.headers;
    const userGames = await UserGame.findAll({
      where: { UserId: id },
      include: { all: true },
    });
    res.status(200).json(userGames);
  }
  static async getUserGame(req, res) {
    const { id } = req.params;
    const userGame = await UserGame.findByPk(id);
  }
}

module.exports = UserGameController;
