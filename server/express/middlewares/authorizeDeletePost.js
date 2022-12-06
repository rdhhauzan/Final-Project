const { Post } = require("../models");
const { verifyToken } = require("../helpers/jwt");

const authorization = async (req, res, next) => {
  try {
    let { access_token } = req.headers;
    let { id } = req.params;
    let payload = verifyToken(access_token);
    let deleted = await Post.findByPk(id);
    if (!deleted) {
        throw { name: "NOT_FOUND" };
      }
    if (payload.id != deleted.UserId) {
      throw { name: "UNAUTHORIZED" };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
