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
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      dob: DataTypes.DATE,
      isValid: DataTypes.BOOLEAN,
      isPremium: DataTypes.BOOLEAN,
      profPict: DataTypes.TEXT,
      domisili: DataTypes.STRING,
      gender: DataTypes.STRING,
      isLogin: DataTypes.BOOLEAN,
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
