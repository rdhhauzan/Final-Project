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
    try {
      const { id } = req.params;
      const userGame = await UserGame.findOne({
        where: { id },
        include: { all: true },
      });
      if (!userGame) throw { msg: "USERGAME_NOT_FOUND" };
      res.status(200).json(userGame);
    } catch (error) {
      console.log(error);
    }
  }
  static async createUserGame(req, res) {
    try {
      const UserId = req.user.id;
      const { GameId, rank, role, matchType, aboutMe } = req.body;
      await UserGame.create({ GameId, UserId, rank, role, matchType, aboutMe });
      res
        .status(201)
        .json({ msg: "Your game info has been successfully created!" });
    } catch (error) {
      console.log(error);
    }
  }
  static async editUserGame(req, res) {
    try {
      const { id } = req.params;
      const { rank, role, matchType, aboutMe } = req.body;
      await UserGame.update(
        { rank, role, matchType, aboutMe },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).json({ msg: "Your game info has been updated!" });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserGameController;
