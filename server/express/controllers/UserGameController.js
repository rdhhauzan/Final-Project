const { Op } = require("sequelize");
const { Game, UserGame, User, sequelize } = require("../models/index");

class UserGameController {
  static async getAllUserGames(req, res, next) {
    try {
      const { id } = req.user;
      const userGames = await UserGame.findAll({
        where: { UserId: id },
        include: { model: Game, require: false },
      });
      res.status(200).json(userGames);
    } catch (error) {
      next(error);
    }
  }
  static async getUserGame(req, res, next) {
    try {
      const { id } = req.params;
      const userGame = await UserGame.findOne({
        where: { id },
        include: { all: true },
      });
      if (!userGame) throw { name: "NOT_FOUND" };
      res.status(200).json(userGame);
    } catch (error) {
      next(error);
    }
  }
  static async createUserGame(req, res, next) {
    try {
      const UserId = req.user.id;
      const GameId = req.params.id;
      let game = await Game.findByPk(GameId);
      if (!game) {
        throw { name: "NOT_FOUND" };
      }
      const { rank, role, matchType, aboutMe } = req.body;
      await UserGame.create({
        GameId,
        UserId,
        rank: game.rankList[rank],
        role,
        matchType,
        aboutMe,
      });
      res
        .status(201)
        .json({ msg: "Your game info has been successfully created!" });
    } catch (error) {
      next(error);
    }
  }
  static async editUserGame(req, res, next) {
    try {
      const { id } = req.params;
      const { rank, role, matchType, aboutMe } = req.body;
      let usergame = await User.findByPk(id);

      if (!usergame) {
        throw { name: "NOT_FOUND" };
      }
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
      next(error);
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
      if (!userGame) {
        throw { name: "MATCHMAKING ERROR" };
      }
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
      if (similarUsers.length < 1) throw { name: "MATCHMAKING ERROR" };
      res
        .status(200)
        .json({ msg: "MATCH FOUND!", match: [...similarUsers, userGame] });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserGameController;
