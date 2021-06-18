const db = require("../models");
const getIdUser = require("../utils/decodeToken");

// Ont créer une publication
exports.createPublication = (req, res) => {
  // Ont valide la requête
  if (!req.body.title) {
    res.status(404).send({
      message: "Le champ 'Titre' ne peut pas être vide",
    });
  }
  if (!req.body.content) {
    res.status(404).send({
      message: "Le champ 'Contenu' ne peut pas être vide",
    });
  }
  // Ont sauvegarde une publication
  db.Publications.create({
    title: req.body.title,
    content: req.body.content,
    UserId: getIdUser(req),
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Une erreur à été rencontré lors de la création de la publication",
      });
    });
};

// Ont récupère les publications par l'ID de l'auteur
exports.getPublicationByAuthor = (req, res) => {
  const authorID = req.params.UserId;
  db.Publications.findAll({
    where: authorID,
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: db.Users,
        attributes: ["username"],
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Une erreur à été rencontré lors de la récupération des publication de l'auteur avec l'id=" +
          authorID,
      });
    });
};

// Ont récupère une publication par son ID
exports.getOnePublication = (req, res) => {
  const paramsId = req.params.id;
  db.Publications.findByPk(paramsId, {
    order: [[db.Comments, "createdAt", "DESC"]],
    where: { PublicationId: req.body.PublicationId },
    include: [
      {
        model: db.Users,
        attributes: ["username"],
      },
      {
        model: db.Comments,
        attributes: ["content", "createdAt", "UserId"],
        //
        include: [
          {
            model: db.Users,
            attributes: ["username"],
          },
        ],
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message:
          "Une erreur à été rencontré lors de la récupération de la publication avec l'id=" +
          paramsId,
      });
    });
};

// Ont récupère toutes les publications disponnibles en base de données
exports.getAllPublications = (req, res) => {
  db.Publications.findAll({
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: db.Users,
        attributes: ["username"],
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Une erreur à été rencontré lors de la récupérations des publications",
      });
    });
};

// Ont supprime une publication par son ID
exports.deleteOnePublication = (req, res) => {
  const paramsId = req.params.id;
  db.Publications.destroy({
    where: { id: paramsId },
    UserId: getIdUser(req),
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "La publication à été supprimer avec succès!",
        });
      } else {
        res.status(404).send({
          message: `La publication avec l'id=${paramsId} ne peut être supprimer. Peut-être que la publication n'a pas été trouvé!`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "La publication avec l'id=" + paramsId + "n'a pas plus être supprimer",
      });
    });
};

// ADMIN

// Ont supprime toutes les publications disponnibles en BDD
exports.AdminDeleteAll = (req, res) => {
  db.Publications.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.status(200).send({ message: `${nums} publications ont été supprimé` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Une erreur à été rencontré lors de la suppresions des publications",
      });
    });
};

// Ont supprime une publication par son ID
exports.AdminDeleteOnePublication = (req, res) => {
  const paramsId = req.params.id;
  db.Publications.destroy({
    where: { id: paramsId },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "La publication à été supprimer avec succès!",
        });
      } else {
        res.status(404).send({
          message: `La publication avec l'id=${paramsId} ne peut être supprimer. Peut-être que la publication n'a pas été trouvé!`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "La publication avec l'id=" + paramsId + "n'a pas plus être supprimer",
      });
    });
};
