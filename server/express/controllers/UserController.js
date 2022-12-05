const { comparePassword } = require("../helpers/bcrypt");
const { OAuth2Client } = require("google-auth-library");
const { createToken, verifyToken } = require("../helpers/jwt");
const midtransClient = require("midtrans-client");
const {
  User,
  UserGame,
  Post,
  Follow,
  Game,
  sequelize,
} = require("../models/index");
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
        .then(function (response) {})
        .catch(function (error) {
          console.error(error);
        });

      //SENDGRID
      const sendGridOptions = {
        method: "POST",
        url: "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "23a6561ec0mshb315685264122e1p1fd4dbjsn695296c97cc3",
          "X-RapidAPI-Host": "rapidprod-sendgrid-v1.p.rapidapi.com",
        },

        data: {
          personalizations: [
            {
              to: [{ email }],
              subject: "Verify your account!",
            },
          ],
          from: { email: "info@team-up.com" },
          content: [
            {
              type: "text/html",
              value: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"
              <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml"><head>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
              <!--[if !mso]><!-->
              <meta http-equiv="X-UA-Compatible" content="IE=Edge">
              <!--<![endif]-->
              <!--[if (gte mso 9)|(IE)]>
              <xml>
                <o:OfficeDocumentSettings>
                  <o:AllowPNG/>
                  <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
              </xml>
              <![endif]-->
              <!--[if (gte mso 9)|(IE)]>
          <style type="text/css">
            body {width: 600px;margin: 0 auto;}
            table {border-collapse: collapse;}
            table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
            img {-ms-interpolation-mode: bicubic;}
          </style>
        <![endif]-->
              <style type="text/css">
            body, p, div {
              font-family: inherit;
              font-size: 14px;
            }
            body {
              color: #000000;
            }
            body a {
              color: #1188E6;
              text-decoration: none;
            }
            p { margin: 0; padding: 0; }
            table.wrapper {
              width:100% !important;
              table-layout: fixed;
              -webkit-font-smoothing: antialiased;
              -webkit-text-size-adjust: 100%;
              -moz-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
            }
            img.max-width {
              max-width: 100% !important;
            }
            .column.of-2 {
              width: 50%;
            }
            .column.of-3 {
              width: 33.333%;
            }
            .column.of-4 {
              width: 25%;
            }
            @media screen and (max-width:480px) {
              .preheader .rightColumnContent,
              .footer .rightColumnContent {
                text-align: left !important;
              }
              .preheader .rightColumnContent div,
              .preheader .rightColumnContent span,
              .footer .rightColumnContent div,
              .footer .rightColumnContent span {
                text-align: left !important;
              }
              .preheader .rightColumnContent,
              .preheader .leftColumnContent {
                font-size: 80% !important;
                padding: 5px 0;
              }
              table.wrapper-mobile {
                width: 100% !important;
                table-layout: fixed;
              }
              img.max-width {
                height: auto !important;
                max-width: 100% !important;
              }
              a.bulletproof-button {
                display: block !important;
                width: auto !important;
                font-size: 80%;
                padding-left: 0 !important;
                padding-right: 0 !important;
              }
              .columns {
                width: 100% !important;
              }
              .column {
                display: block !important;
                width: 100% !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
                margin-left: 0 !important;
                margin-right: 0 !important;
              }
            }
          </style>
              <!--user entered Head Start--><link href="https://fonts.googleapis.com/css?family=Muli&display=swap" rel="stylesheet"><style>
        body {font-family: 'Muli', sans-serif;}
        </style><!--End Head user entered-->
            </head>
            <body>
              <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:inherit; color:white; background-color:#222222;">
                <div class="webkit">
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
                    <tbody><tr>
                      <td valign="top" bgcolor="#FFFFFF" width="100%">
                        <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                          <tbody><tr>
                            <td width="100%">
                              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tbody><tr>
                                  <td>
                                    <!--[if mso]>
            <center>
            <table><tr><td width="600">
          <![endif]-->
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                              <tbody><tr>
                                                <td role="modules-container" style="padding:0px 0px 0px 0px; color:white; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
            <tbody><tr>
              <td role="module-content">
                <p></p>
              </td>
            </tr>
          </tbody></table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:30px 20px 30px 20px;" bgcolor="#2e2e2e">
            <tbody>
              <tr role="module-content">
                <td height="100%" valign="top">
                  <table class="column" width="540" style="width:540px; border-spacing:0; border-collapse:collapse; margin:0px 10px 0px 10px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="">
                    <tbody>
                      <tr>
                        <td style="padding:0px;margin:0px;border-spacing:0;"><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="72aac1ba-9036-4a77-b9d5-9a60d9b05cba">
            <tbody>
              <tr>
                <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
                  <img class="max-width" border="0" style="display:block; color:white; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px;" alt="" data-proportionally-constrained="true" data-responsive="false" width=245.5 height=122.5 src="https://cdn.discordapp.com/attachments/1045650332220411941/1047510902783619142/TeamUP-logo-removebg-preview.png">
                </td>
              </tr>
            </tbody>
          </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="331cde94-eb45-45dc-8852-b7dbeb9101d7">
            <tbody>
              <tr>
                <td style="padding:0px 0px 20px 0px;" role="module-content" bgcolor="">
                </td>
              </tr>
            </tbody>
          </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="27716fe9-ee64-4a64-94f9-a4f28bc172a0">
            <tbody>
              <tr>
                <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
                </td>
              </tr>
            </tbody>
          </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="948e3f3f-5214-4721-a90e-625a47b1c957" data-mc-module-version="2019-10-22">
            <tbody>
              <tr>
                <td style="padding:50px 30px 18px 30px; line-height:36px; text-align:inherit; background-color:#222222;" height="100%" valign="top" bgcolor="#ffffff" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 43px ; font-weight: 500;">Registration Success!&nbsp;</span></div><div></div></div></td>
              </tr>
            </tbody>
          </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="a10dcb57-ad22-4f4d-b765-1d427dfddb4e" data-mc-module-version="2019-10-22">
            <tbody>
              <tr>
                <td style="padding:18px 30px 18px 30px; line-height:22px; text-align:inherit; background-color:#222222;" height="100%" valign="top" bgcolor="#ffffff" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 18px">Please verify your email address to</span><span style="color: white; font-size: 18px; font-family: arial,helvetica,sans-serif"> get access on our website!</div>
        <div style="font-family: inherit; text-align: center"><span style="color: #D7385E; font-size: 18px"><strong>Thank you!&nbsp;</strong></span></div><div></div></div></td>
              </tr>
            </tbody>
          </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="7770fdab-634a-4f62-a277-1c66b2646d8d">
            <tbody>
              <tr>
                <td style="padding:0px 0px 20px 0px;" role="module-content" bgcolor="#222222">
                </td>
              </tr>
            </tbody>
          </table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="d050540f-4672-4f31-80d9-b395dc08abe1">
              <tbody>
                <tr>
                  <td align="center" bgcolor="#222222" class="outer-td" style="padding:0px 0px 0px 0px;">
                    <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
                      <tbody>
                        <tr>
                        <td align="center" bgcolor="#D7385E " class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
                          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" style="background-color:#D7385E  ; border:1px solid #D7385E  ; border-color:#D7385E  ; border-radius:0px; border-width:1px; color:white; display:inline-block; font-size:14px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:12px 40px 12px 40px; text-align:center; text-decoration:none; border-style:solid; font-family:inherit;" target="_blank">Verify Email Now</a>
                        </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="7770fdab-634a-4f62-a277-1c66b2646d8d.1">
            <tbody>
              <tr>
                <td style="padding:0px 0px 50px 0px;" role="module-content" bgcolor="#222222">
                </td>
              </tr>
            </tbody>
              <tbody>
                <tr>
                  <td align="center" bgcolor="#6e6e6e" class="outer-td" style="padding:0px 0px 0px 0px;">
        
                  </td>
                </tr>
              </tbody>
            </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="c37cc5b7-79f4-4ac8-b825-9645974c984e">
        
          </table></td>
                      </tr>
                    </tbody>
                  </table>
                  
                </td>
              </tr>
                <tr>
                  <td align="center" bgcolor="" class="outer-td" style="padding:0px 0px 20px 0px;">
                  </td>
                </tr>
              </tbody>
            </table></td>
                                              </tr>
                                            </tbody></table>
                                            <!--[if mso]>
                                          </td>
                                        </tr>
                                      </table>
                                    </center>
                                    <![endif]-->
                                  </td>
                                </tr>
                              </tbody></table>
                            </td>
                          </tr>
                        </tbody></table>
                      </td>
                    </tr>
                  </tbody></table>
                </div>
              </center>
            
          
        </body></html>`,
            },
          ],
        },
      };
      axios
        .request(sendGridOptions)
        .then(function (response) {})
        .catch(function (error) {
          console.error(error);
        });

      res.status(201).json(registered);
    } catch (error) {
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
        uuid: findUser.uuid,
        email: findUser.email,
      };
      await User.update({ isLogin: true }, { where: { id: findUser.id } });
      const access_token = createToken(payload);
      res.status(200).json({
        access_token: access_token,
        id: findUser.id,
        email: findUser.email,
        username: findUser.username,
        uuid: findUser.uuid,
      });
    } catch (error) {
      next(error);
    }
  }
  static async editUser(req, res, next) {
    const { username, email, password, dob, domisili, gender } = req.body;
    const data = await sharp(req.file.buffer).webp({ quality: 20 }).toBuffer();
    try {
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
    } catch (error) {
      next(error);
    }
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
          // {
          //   model: Follow,
          //   include: { model: User, include: UserGame, required: false },
          //   required: false,
          // },
        ],
      });
      if (!user) {
        throw { name: "NOT_FOUND" };
      }
      let followed = await Follow.findAll({
        where: { FollowerId: id },
        include: { model: User, include: UserGame, required: false },
      });
      res.status(200).json({ user, followed });
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
      const findTarget = await User.findOne({ where: { id: id } });
      if (id == req.user.id) {
        throw { name: "FOLLOW_ERROR" };
      }
      let follow = await Follow.create({
        FollowerId: req.user.id,
        FollowedId: id,
      });
      const axios = require("axios");

      const options = {
        method: "POST",
        url: `https://2269480a5983d987.api-us.cometchat.io/v3/users/${req.user.uuid}/friends`,
        headers: {
          apiKey: "dd160c53b176e730b4e702acbc12a2ddfc921eda",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: { accepted: [`${findTarget.uuid}`] },
      };

      axios
        .request(options)
        .then(function (response) {
        })
        .catch(function (error) {
          console.error(error);
        });
      res.status(200).json(follow);
    } catch (error) {
      next(error);
    }
  }

  static async addPost(req, res, next) {
    const t = await sequelize.transaction();
    let { title, content, GameId } = req.body;
    const data = await sharp(req.file.buffer).webp({ quality: 20 }).toBuffer();
    try {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "posts" },
        async (error, result) => {
          if (error) throw { name: "INVALID_ACCESS" };
          try {
            const axios = require("axios");

            const options = {
              method: "GET",
              url: "https://community-purgomalum.p.rapidapi.com/json",
              params: {
                text: content,
                add: "anjing,ngentot,bangsat,bajingan,babi,fuck,kontol,tolol,memek,goblok",
              },
              headers: {
                "X-RapidAPI-Key": process.env.PURGOMALUM_API,
                "X-RapidAPI-Host": "community-purgomalum.p.rapidapi.com",
              },
            };
            let { data } = await axios.request(options, { transaction: t });

            content = data.result;
            let imgUrl = result.secure_url;
            let payload = {
              title,
              content,
              GameId,
              imgUrl,
              UserId: req.user.id,
            };
            await Post.create(payload, { transaction: t });
            await t.commit();
            res.status(200).json({ msg: "Post sucessfully updated" });
          } catch (error) {
            await t.rollback();
            next(error);
          }
        },
        { transaction: t }
      );
      bufferToStream(data).pipe(stream);
    } catch (error) {
      await t.rollback();
      next(error);
    }
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

  static async google(req, res, next) {
    try {
      let uuid = uuidv4();
      let { id_token } = req.headers;
      const client = new OAuth2Client(process.env.GOOGLE_ID);
      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_ID,
      });
      const payload = ticket.getPayload();
      const userid = payload["sub"];
      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.given_name,
          email: payload.email,
          password: "123456",
          dob: "01/01/2002",
          domisili: "INDONESIA",
          gender: "MALE",
          uniqueStr: "unique",
          uuid,
          isValid: true,
          isPremium: false,
          isLogin: false,
        },
        hooks: false,
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
          name: payload.given_name,
          avatar:
            "https://static.vecteezy.com/system/resources/previews/007/698/902/original/geek-gamer-avatar-profile-icon-free-vector.jpg",
        },
      };

      axios
        .request(options)
        .then(function (response) {})
        .catch(function (error) {
          console.error(error);
        });
      const access_token = createToken({ id: user.id });
      res.status(200).json({
        access_token,
        id: user.id,
        email: user.email,
        username: user.username,
        uuid: user.uuid,
      });
    } catch (error) {
      next(error);
    }
  }

  static async userPayment(req, res, next) {
    try {
      // Create Snap API instance
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: "SB-Mid-server-nU1WKAwolq2Zzv-eKVov7L65",
      });

      let parameter = {
        transaction_details: {
          order_id: "YOUR-ORDERID-" + Math.floor(Math.random() * 500000),
          gross_amount: 20000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: req.user.email,
        },
      };

      snap.createTransaction(parameter).then((transaction) => {
        // transaction token
        let transactionToken = transaction.token;
        let transactionUrl = transaction.redirect_url;
        res.status(200).json({
          transactionToken: transactionToken,
          redirect_url: transactionUrl,
        });
      });
      // res.redirect(200, transactionUrl);
    } catch (error) {
      next(error);
    }
  }

  // static userPayment(req, res, next) {
  //   let randomized = Math.floor(Math.random() * 10000);

  //   let data = JSON.stringify({
  //     transaction_details: {
  //       order_id: "ORDER-" + randomized ,
  //       gross_amount: 10000,
  //     },
  //     credit_card: {
  //       secure: true,
  //     },
  //   });

  //   let config = {
  //     method: "post",
  //     url: "https://app.sandbox.midtrans.com/snap/v1/transactions",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization:
  //         "Basic U0ItTWlkLXNlcnZlci1UcUxfdGZCUWJ4QkdhOWNFME8wWElxM1E6",
  //     },
  //     data: data,
  //   };

  //   axios(config)
  //     .then(function (response) {
  //       res.status(201).json(response.data);
  //     })
  //     .catch(function (error) {
  //     });
  // }

  static async premium(req, res, next) {
    try {
      let { id } = req.user;
      let user = await User.findByPk(id);
      if (!user) {
        throw { name: "NOT_FOUND" };
      }
      await User.update({ isPremium: true }, { where: { id } });
      res.status(200).json({ msg: "Your account is now premium" });
    } catch (error) {
      next(error);
    }
  }

  static async getPosts(req, res, next) {
    try {
      let posts = await Post.findAll({ include: { all: true, nested: true } });
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }

}

module.exports = UserController;
