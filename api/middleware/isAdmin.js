const db = require("../models");
const getIdUser = require("../utils/decodeToken");

module.exports = (req, res, next) => {
  db.Users.findOne({ where: { id: getIdUser(req), roles: "admin" } })
    .then((data) => {
      if (data.roles === "admin") return next();

      return res.status(401).send({ message: "Pas admin" });
    })
    .catch(() => {
      res.status(500).send({
        message: "L'utilisateur n'est pas administrateur!",
      });
    });
};
