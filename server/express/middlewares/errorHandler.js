const errorHandler = (err, req, res, next) => {
  let error = [];
  switch (err.name) {
    case "SequelizeValidationError":
      err.errors.forEach((e) => {
        error.push(e.message);
      });
      res.status(400).json({ msg: error.join(" ") });
      break;

    case "SequelizeUniqueConstraintError":
      err.errors.forEach((e) => {
        error.push(e.message);
      });
      res.status(400).json({ msg: error.join(" ") });
      break;

    case "JsonWebTokenError":
      res.status(401).json({ msg: "Invalid Token" });
      break;

    case "LOGIN_ERROR":
      res.status(400).json({
        msg: "Please Fill All Fields!",
      });
      break;

    case "FOLLOW_ERROR":
      res.status(400).json({
        msg: "You can't follow yourself!",
      });
      break;

    case "NOT_FOUND":
      res.status(404).json({
        msg: "Data Not Found",
      });
      break;

    case "INVALID_DATA":
      res.status(400).json({
        msg: "Invalid email / Password",
      });
      break;

    case "INVALID_ACCESS":
      res.status(400).json({
        msg: "Invalid email / Password",
      });
      break;

    case "MATCHMAKING ERROR":
      res.status(404).json({
        msg: "No players found! please try again later!",
      });
      break;

    case "USERGAME_EXISTS":
      res.status(400).json({
        msg: "You already have this game info!",
      });
      break;

    case "UNAUTHORIZED":
      res.status(403).json({
        msg: "You are not authorized!",
      });
      break;

    default:
      res.status(500).json({
        msg: "Internal Server Error",
      });
      break;
  }
};

module.exports = errorHandler;
