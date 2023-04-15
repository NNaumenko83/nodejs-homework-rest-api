const { HttpError } = require("../helpers");

const isValidFavoriteBody = (req, res, next) => {
  if ("favorite" in req.body) {
    next();
  } else {
    next(HttpError(400, "missing field favorite"));
  }
};

module.exports = isValidFavoriteBody;
