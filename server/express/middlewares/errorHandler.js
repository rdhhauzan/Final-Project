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
      err.errors.forEach((e) => {
        error.push(e.message);
      });
      res.status(400).json({ msg: error.join(" ") });
      break;

    case "LOGIN_ERROR":
      res.status(403).json({
        msg: "Please Fill All Fields!",
      });
      break;

    case "INVALID_DATA":
      res.status(403).json({
        msg: "Invalid Username / Password",
      });
      break;

    case "INVALID_VERIF_LINK":
      res.status(403).json({
        msg: "Invalid Verification link!",
      });
      break;

    case "MATCHMAKING ERROR":
      res.status(404).json({
        msg: "No players found! please try again later!",
      });
      break;

    default:
      break;
  }
};
