"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Game.hasMany(models.UserGame);
      Game.hasMany(models.Post);
    }
  }
  Game.init(
    {
      platform: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Fill in the Platform" },
          notNull: { msg: "Fill in the Platform" },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Fill in the Name" },
          notNull: { msg: "Fill in the Name" },
        },
      },
      maxPlayers: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Fill in the Maximum Players" },
          notNull: { msg: "Fill in the Maximum Players" },
        },
      },
      rankList: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Fill in the Rank" },
          notNull: { msg: "Fill in the Rank" },
        },
      },
      roleList: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Fill in the Role" },
          notNull: { msg: "Fill in the Role" },
        },
      },
    },
    {
      sequelize,
      modelName: "Game",
    }
  );
  return Game;
};
