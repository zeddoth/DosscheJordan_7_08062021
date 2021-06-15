const db = require("../models");

// Ont créé un commentaire par rapport à l'ID de la publication
exports.createComment = (req, res) => {
  const comment = {
    content: req.body.content,
    UserId: req.body.UserId,
    PublicationId: req.body.PublicationId,
    attachment: req.body.attachment,
  };
  console.log(comment);
  db.Comments.create(comment)
    .then((data) => {
      res.send({ data: data, message: "Commentaire publié avec succès" });
    })
    .catch(() => {
      res
        .status(400)
        .send({ message: "Une erreur à été rencontré lors de la publication du commentaire" });
    });
};

// Ont récupère les commentaire par rapport à l'ID de la publication
exports.getComments = (req, res) => {
  const PublicationId = req.params.PublicationId;
  db.Publications.findAll({ where: PublicationId })
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message:
          "Une erreur à été rencontré lors de la récupération des commentaire de la publication avec l'id=" +
          PublicationId,
      });
    });
};

// Ont supprime un commentaire par son ID
exports.deleteComment = (req, res) => {
  const paramsId = req.params.id;
  db.Comments.destroy({ where: { id: paramsId } })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "Le commentaire à été supprimer avec succès!",
        });
      } else {
        res.status(401).send({
          message: `Le commentaire avec l'id=${paramsId} ne peut être supprimer. Peut-être que le commentaire n'a pas été trouvé!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Le commentaire avec l'id=" + paramsId + "n'a pas pu être supprimer",
      });
    });
};

exports.deleteAllComments = (req, res) => {
  const PublicationId = req.params.PublicationId;
  db.Comments.destroy({
    where: { PublicationId: PublicationId },
    truncate: false,
  })
    .then((nums) => {
      res.status(200).send({ message: `${nums} commentaires ont été supprimés` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Une erreur à été rencontré lors de la suppresions des commentaires",
      });
    });
};
