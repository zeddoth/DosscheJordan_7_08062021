const db = require("../models");

// Ont créer une publication
exports.createPublication = (req, res) => {
  // Ont valide la requête
  if (!req.body.title) {
    res.status(400).send({
      message: "Le champ 'Titre' ne peut pas être vide",
    });
  }
  if (!req.body.content) {
    res.status(400).send({
      message: "Le champ 'Contenu' ne peut pas être vide",
    });
  }
  // Ont sauvegarde une publication
  db.Publications.create({
    title: req.body.title,
    content: req.body.content,
    UserId: req.body.UserId,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

// Ont récupère les publications par l'ID de l'auteur
exports.getPublicationByAuthor = (req, res) => {
  const authorID = req.params.UserId;
  db.Publications.findAll({ where: authorID })
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
  db.Publications.findByPk(paramsId)
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
  db.Publications.findAll()
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
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "La publication à été supprimer avec succès!",
        });
      } else {
        res.status(401).send({
          message: `La publication avec l'id=${paramsId} ne peut être supprimer. Peut-être que la publication n'a pas été trouvé!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "La publication avec l'id=" + paramsId + "n'a pas plus être supprimer",
      });
    });
};

// Ont supprime toutes les publications disponnibles en BDD
exports.deleteAll = (req, res) => {
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
