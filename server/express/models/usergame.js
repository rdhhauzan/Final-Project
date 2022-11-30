"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserGame.belongsTo(models.User);
      UserGame.belongsTo(models.Game);
    }
  }
  UserGame.init(
    {
      GameId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      rank: DataTypes.STRING,
      role: DataTypes.STRING,
      matchType: DataTypes.STRING,
      aboutMe: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "UserGame",
    }
  );
  return UserGame;
};
