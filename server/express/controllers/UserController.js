const { comparePassword } = require("../helpers/bcrypt");
const { createToken, verifyToken } = require("../helpers/jwt");
const { User, UserGame, Post, Follow, Game } = require("../models/index");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const cloudinary = require("cloudinary").v2;
const { Readable } = require("stream");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const bufferToStream = (buffer) => {
  const readable = new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });
  return readable;
};
class UserController {
  static async registerUser(req, res, next) {
    let uuid = uuidv4();
    const { username, email, password, dob, domisili, gender } = req.body;
    try {
      const uniqueStr = createToken({ email });
      let registered = await User.create({
        username,
        email,
        password,
        dob,
        domisili,
        gender,
        uniqueStr,
        uuid,
        isValid: false,
        isPremium: false,
        isLogin: false,
      });
      // ! Cometchat Create User
      const options = {
        method: "POST",
        url: "https://2269480a5983d987.api-us.cometchat.io/v3/users",
        headers: {
          apiKey: "dd160c53b176e730b4e702acbc12a2ddfc921eda",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: {
          metadata: {
            "@private": {
              email: "user@email.com",
              contactNumber: "0123456789",
            },
          },
          uid: uuid,
          name: username,
          avatar:
            "https://static.vecteezy.com/system/resources/previews/007/698/902/original/geek-gamer-avatar-profile-icon-free-vector.jpg",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
      res.status(201).json(registered);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async loginUser(req, res, next) {
    try {
      let { email, password } = req.body;

      if (!email || !password) {
        throw { name: "LOGIN_ERROR" };
      }

      let findUser = await User.findOne({ where: { email } });

      if (!findUser || !findUser.isValid) {
        throw { name: "INVALID_DATA" };
      }

      let validateUser = comparePassword(password, findUser.password);

      if (!validateUser) {
        throw { name: "INVALID_DATA" };
      }

      let payload = {
        id: findUser.id,
      };
      await User.update({ isLogin: true }, { where: { id: findUser.id } });
      const access_token = createToken(payload);
      res.status(200).json({
        access_token: access_token,
        id: findUser.id,
        email: findUser.email,
        username: findUser.username,
      });
    } catch (error) {
      next(error);
    }
  }
  static async editUser(req, res, next) {
    const { username, email, password, dob, domisili, gender } = req.body;
    const data = await sharp(req.file.buffer).webp({ quality: 20 }).toBuffer();
    const stream = cloudinary.uploader.upload_stream(
      { folder: "profile pictures" },
      async (error, result) => {
        if (error) throw { name: "INVALID_ACCESS" };
        try {
          let profPict = result.secure_url;
          let { id } = req.params;
          let payload = {
            username,
            email,
            password,
            dob,
            domisili,
            gender,
            profPict,
          };
          await User.update(payload, { where: { id } });
          res.status(200).json({ msg: "Profile sucessfully updated" });
        } catch (error) {
          next(error);
        }
      }
    );
    bufferToStream(data).pipe(stream);
  }
  static async getUsers(req, res, next) {
    try {
      let users = await User.findAll({
        include: [
          { model: UserGame, required: false },
          { model: Post, required: false },
        ],
      });
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async getOnlineUsers(req, res, next) {
    try {
      let users = await User.findAll({
        include: [
          { model: UserGame, required: false },
          { model: Post, required: false },
        ],
        where: { isLogin: true },
      });
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async getUserDetail(req, res, next) {
    try {
      let { id } = req.params;
      let user = await User.findByPk(id, {
        include: [
          { model: UserGame, required: false },
          { model: Post, required: false, include: Game },
          {
            model: Follow,
            include: { model: User, include: UserGame, required: false },
            required: false,
          },
        ],
      });
      if (!user) {
        throw { name: "NOT_FOUND" };
      }
      // let followed = await Follow.findAll({
      //   where: { FollowerId: id },
      //   include: { model: User, include: UserGame, required: false },
      // });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async verifyAccount(req, res, next) {
    try {
      const { uniqueStr } = req.params;
      let payload = verifyToken(uniqueStr);
      const foundUser = User.findOne({ where: { email: payload } });
      if (!foundUser) throw { name: "INVALID_VERIF_LINK" };
      await User.update({ isValid: true }, { where: { uniqueStr } });
      res.status(200).json({ msg: "Your email has been verified!" });
    } catch (error) {
      next(error);
    }
  }

  static async followUser(req, res, next) {
    try {
      let { id } = req.params;
      if (id == req.user.id) {
        throw { name: "FOLLOW_ERROR" };
      }
      let follow = await Follow.create({
        FollowerId: req.user.id,
        FollowedId: id,
      });
      res.status(200).json(follow);
    } catch (error) {
      next(error);
    }
  }

  static async addPost(req, res, next) {
    console.log(req.body);
    const { title, content, GameId } = req.body;
    const data = await sharp(req.file.buffer).webp({ quality: 20 }).toBuffer();
    const stream = cloudinary.uploader.upload_stream(
      { folder: "posts" },
      async (error, result) => {
        if (error) throw { name: "INVALID_ACCESS" };
        try {
          let imgUrl = result.secure_url;
          let payload = {
            title,
            content,
            GameId,
            imgUrl,
            UserId: req.user.id,
          };
          await Post.create(payload);
          res.status(200).json({ msg: "Post sucessfully updated" });
        } catch (error) {
          console.log(error);
          next(error);
        }
      }
    );
    bufferToStream(data).pipe(stream);
  }
  static async logoutUser(req, res, next) {
    try {
      let user = await User.findByPk(req.user.id);
      if (!user) {
        throw { name: "INVALID_ACCESS" };
      }
      if (!user.isLogin) {
        throw { name: "INVALID_ACCESS" };
      }
      await User.update({ isLogin: false }, { where: { id: req.user.id } });
      res.status(200).json({ msg: "You have been logged out" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
