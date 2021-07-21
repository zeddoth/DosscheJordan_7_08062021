const db = require("../models");
const getIdUser = require("../utils/decodeToken");

// Ont créé un commentaire par rapport à l'ID de la publication
exports.createComment = async (req, res) => {
  try {
    const paramsId = req.params.id;
    const comment = {
      content: req.body.content,
      UserId: getIdUser(req),
      PublicationId: paramsId,
    };
    console.log(comment);
    await db.Comments.create(comment)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Une erreur à été rencontré lors de la création de la publication",
        });
      });
    await db.Publications.increment({ comment: 1 }, { where: { id: paramsId } });
    return res.status(200).send({ message: "Commentaire publié avec succès" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: " Une erreur à été rencontré lors de la publication du commentaire" });
  }
};

// Ont récupère les commentaire par rapport à l'ID de la publication
exports.getComments = (req, res) => {
  const paramsId = req.params.id;
  db.Comments.findAll({
    order: [["createdAt", "DESC"]],
    where: { PublicationID: paramsId },
    include: [
      {
        model: db.Users,
        attributes: ["username", "profileImage"],
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message:
          "Une erreur à été rencontré lors de la récupération des commentaire de la publication avec l'id=" + paramsId,
      });
    });
};

// Ont supprime un commentaire par son ID
exports.deleteComment = async (req, res) => {
  try {
    const paramsId = req.params.id;
    const comment = await db.Comments.findOne({ where: { id: paramsId } });
    await db.Comments.destroy({ where: { id: paramsId, userId: getIdUser(req) } });
    await db.Publications.decrement({ comment: 1 }, { where: { id: comment.PublicationId } });
    return res.status(200).send({ message: "Le commentaire à été supprimer avec succès!" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: "Le commentaire n'a pas plus être supprimer " });
  }
};

// ADMIN
// Ont supprime un commentaire par son ID
exports.adminDeleteComment = async (req, res) => {
  try {
    const paramsId = req.params.id;
    const comment = await db.Comments.findOne({ where: { id: paramsId } });
    await db.Comments.destroy({ where: { id: paramsId } });
    await db.Publications.decrement({ comment: 1 }, { where: { id: comment.PublicationId } });
    return res.status(200).send({ message: "Le commentaire à été supprimer avec succès!" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: "Le commentaire n'a pas plus être supprimer " });
  }
};
