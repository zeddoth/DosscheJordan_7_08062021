const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const fs = require("fs");
require("dotenv").config();
const randomToken = process.env.TOKEN;
const getIdUser = require("../utils/decodeToken");

// Ont enregistre un compte
exports.signup = (req, res) => {
  // Ont valide la requête
  if (!req.body.username) {
    res.status(404).send({
      message: "Le champ 'Utilisateur' ne peut pas être vide",
    });
  }
  if (!req.body.password) {
    res.status(404).send({
      message: "Le champ 'Mot de passe' ne peut pas être vide",
    });
  }
  db.Users.findOne({ where: { username: req.body.username } }).then((username) => {
    if (username) {
      res.status(500).send({ message: "Utilisateur déja existant" });
    }
  });
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      db.Users.create({
        username: req.body.username,
        password: hash,
      });
    })

    .then(() => {
      res.status(200).send({ message: "Utilisateur créé" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Une erreur à été rencontré lors de le création du compte.",
      });
    });
};

// Ont vérifie les informations du compte et ont se connecte
exports.login = (req, res) => {
  if (!req.body.username) {
    res.status(400).send({
      message: "Le champ 'Nom d'utilisateur' ne peut pas être vide",
    });
  }
  if (!req.body.password) {
    res.status(400).send({
      message: "Le champ 'Mot de passe' ne peut pas être vide",
    });
  }
  db.Users.findOne({ where: { username: req.body.username } }).then((user) => {
    if (!user) {
      res.status(400).send({ message: "Utilisateur inexistant" });
    }
    bcrypt.compare(req.body.password, user.password).then((valid) => {
      if (!valid) {
        res.status(400).send({ message: "Mot de passe incorrect" });
      } else {
        res.status(200).send({
          userId: user.id,
          token: jwt.sign({ userId: user.id }, randomToken, { expiresIn: "24h" }),
        });
      }
    });
  });
};

// Ont supprime l'utilisateur par son ID
exports.deleteUser = (req, res) => {
  db.Users.destroy({
    where: { id: getIdUser(req) },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "L'utilisateur à été supprimer avec succès!",
        });
      } else {
        res.status(404).send({
          message:
            "L'utilisateur avec l'id= " + paramsId + " n'a pas plus être supprimer, peut être qu'il n'existe pas",
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "L'utilisateur avec l'id=" + paramsId + "n'a pas plus être supprimer",
      });
    });
};

// Ont complète le profile par son ID
exports.editUser = (req, res) => {
  if (!req.body.lastName || !req.body.firstName || !req.body.job) {
    res.status(400).send({
      message: "Un ou plusieurs champs sont vide",
    });
  }
  const edit = {
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    job: req.body.job,
  };
  db.Users.update(edit, { where: { id: getIdUser(req) } })
    .then(() => {
      res.status(201).send({ message: "Utilisateur modifié avec succès !" });
    })
    .catch(() => {
      res.status(400).send({ message: "Utilisateur non modifié suite à une erreur" });
    });
};

// Ont modifie le mot de passe de l'utilisateur par son ID
exports.editPassword = (req, res) => {
  if (!req.body.password) {
    res.status(400).send({ message: "Le champ 'mot de passe' ne peut pas être vide" });
  }
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      db.Users.update({ password: hash }, { where: { id: getIdUser(req) } });
      res.status(201).send({ message: "Mot de passe modifié avec succès" });
    })
    .catch(() => {
      res.status(500).send({ message: "Une erreur à été rencontré lors de la modification du mot de passe" });
    });
};
// Ont modifie l'image de profile de l'utilisateur
exports.editProfileImage = async (req, res) => {
  const user = await db.Users.findByPk(getIdUser(req));
  const updateProfileImage = () => {
    db.Users.update(
      {
        profileImage: req.file
          ? ` ${req.protocol}://${req.get("host")}/uploads/profileImage/${req.file.filename}`
          : null,
      },
      {
        where: { id: getIdUser(req) },
      }
    )
      .then(() => {
        res.status(200).send({ message: "Image modifié avec succès" });
      })
      .catch(() => {
        res.status(500).send({ message: "Une erreur à été rencontré lors de la requête" });
      });
  };
  const filename = () => {
    {
      if (filename === null) {
        return;
      } else {
        user.profileImage.split("/uploads/profileImage")[1];
      }
    }
  };
  if (filename === null) {
    updateProfileImage();
  } else {
    fs.unlink(`uploads/profileImage/${filename}`, () => {
      updateProfileImage();
    });
  }
};
// Ont récupère les information du profile par son ID
exports.getUser = (req, res) => {
  const paramsId = req.params.id;
  db.Users.findByPk(paramsId, { attributes: { exclude: ["password"] } })
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message: "Une erreur à été rencontré lors de la récupération du profil avec l'id=" + paramsId,
      });
    });
};

exports.getAllUsers = (req, res) => {
  db.Users.findAll({
    order: [["username", "DESC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({ message: "Une erreur à été rencontré lors de la récupérations des utilisateurs" });
    });
};

// ADMIN
// Ont modifie le role de l'utilisateur (admin / user)
exports.AdminEditRole = (req, res) => {
  const paramsId = req.params.id;
  if (!req.body.roles) {
    res.status(400).send({
      message: "Le rôle ne peut être vide, veuillez renseigner le role par admin ou user",
    });
  }
  db.Users.update({ roles: req.body.roles }, { where: { id: paramsId } })
    .then(() => {
      res.status(201).send({ message: "Rôle de l'utilisateur modifié avec succès !" });
    })
    .catch(() => {
      res.status(500).send({ message: "Rôle de l'utilisateur non modifié suite à une erreur" });
    });
};

// Ont supprime l'utilisateur par son ID
exports.AdminDeleteUser = (req, res) => {
  const paramsId = req.params.id;
  db.Users.destroy({
    where: { id: paramsId },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "L'utilisateur à été supprimer avec succès!",
        });
      } else {
        res.status(404).send({
          message:
            "L'utilisateur avec l'id= " + paramsId + " n'a pas plus être supprimer, peut être qu'il n'existe pas",
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "L'utilisateur avec l'id=" + paramsId + "n'a pas plus être supprimer",
      });
    });
};
