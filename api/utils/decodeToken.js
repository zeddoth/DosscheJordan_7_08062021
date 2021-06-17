const jwt = require("jsonwebtoken");
const randomToken = process.env.TOKEN;
require("dotenv").config();

const getIdUser = (req) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, randomToken);
  const userId = decodedToken.userId;
  return userId;
};

module.exports = getIdUser;
