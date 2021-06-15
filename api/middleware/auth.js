const jwt = require("jsonwebtoken");
require("dotenv").config();
const randomToken = process.env.TOKEN;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, randomToken);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID invalide";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Requête invalide!"),
    });
  }
};
