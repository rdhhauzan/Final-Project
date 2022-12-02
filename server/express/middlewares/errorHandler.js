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

    case "NOT_FOUND":
      res.status(404).json({
        msg: "Data Not Found",
      });
      break;

    case "INVALID_DATA" || "INVALID_ACCESS":
      res.status(400).json({
        msg: "Invalid email / Password",
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
