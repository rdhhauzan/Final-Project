"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UserGame);
      User.hasMany(models.Post);
      User.hasMany(models.Follow, {
        foreignKey: "FollowerId",
      });
      User.hasMany(models.Follow, {
        foreignKey: "FollowedId",
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: {msg: "This email has already been used"},
        allowNull: false,
        validate: {
          notEmpty: { msg: "Fill in the email" },
          notNull: { msg: "Fill in the email" },
          isEmail: { msg: "Type in the correct email format" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Fill in the Password" },
          notNull: { msg: "Fill in the Password" },
          isLength(password) {
            if (password.length < 5) {
              throw new Error("Minimum characters are 5");
            }
          },
        },
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Fill in the Date Of Birth" },
          notNull: { msg: "Fill in the Date Of Birth" },
        },
      },
      isValid: DataTypes.BOOLEAN,
      isPremium: DataTypes.BOOLEAN,
      profPict: DataTypes.TEXT,
      domisili: DataTypes.STRING,
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Fill in the Gender" },
          notNull: { msg: "Fill in the Gender" },
        },
      },
      isLogin: DataTypes.BOOLEAN,
      uniqueStr: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((instance) => {
    instance.profPict =
      "https://static.vecteezy.com/system/resources/previews/007/698/902/original/geek-gamer-avatar-profile-icon-free-vector.jpg";
    instance.isValid = false;
    instance.isPremium = false;
    instance.isLogin = false;
    instance.password = hashPassword(instance.password);
  });
  return User;
};
