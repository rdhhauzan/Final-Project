const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User, UserGame, Post, Follow, Game } = require("../models/index");

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
  static async registerUser(req, res) {
    const { username, email, password, dob, domisili, gender } = req.body;
    try {
      const uniqueStr = createToken({ email: email });
      await User.create({
        username,
        email,
        password,
        dob,
        domisili,
        gender,
        uniqueStr,
      });

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

      if (!findUser || !findUser.isValid) {
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
      await User.update({ isLogin: true }, { where: { id: findUser.id } });
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
  static async editUser(req, res) {
    const { username, email, password, dob, domisili, gender } = req.body;
    const data = await sharp(req.file.buffer).webp({ quality: 20 }).toBuffer();
    const stream = cloudinary.uploader.upload_stream(
      { folder: "profile pictures" },
      async (error, result) => {
        if (error) return console.error(error);
        //   return res.json({ URL: result.secure_url});
        try {
          // let imgName = Date.now() + "-" + Math.floor(Math.random() * 1000);
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
          console.log(error);
        }
      }
    );
    bufferToStream(data).pipe(stream);
  }
  static async getUsers(req, res) {
    try {
      let users = await User.findAll({
        include: [
          { model: UserGame, required: false },
          { model: Post, required: false },
        ],
      });
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
    }
  }

  static async getOnlineUsers(req, res) {
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
      console.log(error);
    }
  }

  static async getUserDetail(req, res) {
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
      // let followed = await Follow.findAll({
      //   where: { FollowerId: id },
      //   include: { model: User, include: UserGame, required: false },
      // });
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  }

  static async verifyAccount(req, res) {
    try {
      const { uniqueStr } = req.params;
      const foundUser = User.findOne({ where: { uniqueStr } });
      if (!foundUser) throw { name: "INVALID_VERIF_LINK" };
      await User.update({ isValid: true }, { where: { uniqueStr } });
      res.status(200).json({ msg: "Your email has been verified!" });
    } catch (error) {
      console.log(error);
    }
  }

  static async followUser(req, res) {
    try {
      let { id } = req.params;
      let follow = await Follow.create({
        FollowerId: req.user.id,
        FollowedId: id,
      });
      res.status(200).json(follow);
    } catch (error) {
      console.log(error);
    }
  }

  static async addPost(req, res) {
    const { title, content, GameId } = req.body;
    const data = await sharp(req.file.buffer).webp({ quality: 20 }).toBuffer();
    const stream = cloudinary.uploader.upload_stream(
      { folder: "posts" },
      async (error, result) => {
        if (error) throw { name: "GAADA_" };
        //   return res.json({ URL: result.secure_url});
        try {
          // let imgName = Date.now() + "-" + Math.floor(Math.random() * 1000);
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
          console.log(error, "<<<<<<<<<<<<<<<<<");
        }
      }
    );
    bufferToStream(data).pipe(stream);
  }
}

module.exports = UserController;
