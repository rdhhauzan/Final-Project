const { Op } = require("sequelize");
const { Game, UserGame, User, sequelize } = require("../models/index");

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
      const GameId = req.params.id;
      const { rank, role, matchType, aboutMe } = req.body;
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

  static async matchmake(req, res, next) {
    try {
      const { id: UserId } = req.user;
      const { id: GameId } = req.params;
      const userGame = await UserGame.findOne({
        where: { UserId, GameId },
        include: User,
      });
      let whereInput = {
        GameId,
        UserId: { [Op.not]: UserId },
        matchType: userGame.matchType,
      };
      if (userGame.matchType === "Competitive")
        whereInput.rank = {
          [Op.between]: [userGame.rank - 1, userGame.rank + 1],
        };

      const similarUsers = await UserGame.findAll({
        where: whereInput,
        include: { model: User, where: { isLogin: true } },
        order: sequelize.random(),
        limit: 4,
      });
      if (similarUsers.length < 1) throw { msg: "MATCHMAKING_ERROR" };
      res
        .status(200)
        .json({ msg: "MATCH FOUND!", match: [...similarUsers, userGame] });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserGameController;
