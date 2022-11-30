const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models/index");
class UserController {
  static async registerUser(req, res) {
    const { username, email, password, dob, domisili, gender } = req.body;
    try {
      await User.create({ username, email, password, dob, domisili, gender });

      res.status(201).json({ msg: "Register Success!" });
    } catch (error) {
      console.log(error);
    }
  }

  static async loginUser(req, res) {
    try {
      let { email, password } = req.body;

      if (!email || !password) {
        throw { name: "LOGIN_ERROR" };
      }

      let findUser = await User.findOne({ where: { email } });

      if (!findUser) {
        throw { name: "INVALID_DATA" };
      }

      let validateUser = comparePassword(password, findUser.password);

      if (!validateUser) {
        throw { name: "INVALID_DATA" };
      }

      let payload = {
        id: findUser.id,
        email: findUser.email,
        username: findUser.username,
      };

      const access_token = createToken(payload);
      res.status(200).json({
        access_token: access_token,
        id: findUser.id,
        email: findUser.email,
        username: findUser.username,
      });
    } catch (error) {
      if (error.name == "LOGIN_ERROR") {
        res.status(403).json({
          msg: "Please Fill All Fields!",
        });
      } else if (error.name == "INVALID_DATA") {
        res.status(403).json({
          msg: "Invalid Username / Password",
        });
      }
      console.log(error);
    }
  }
}

module.exports = UserController;
