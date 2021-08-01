const db = require("../models");
const getIdUser = require("../utils/decodeToken");
const fs = require("fs");

// Ont créer une publication
exports.createPublication = (req, res) => {
  // Ont valide la requête
  console.log(req.body);
  if (req.body.title === "") {
    return res.status(401).send({
      message: "Le champ 'Titre' ne peut pas être vide",
    });
  }
  if (!req.file && req.body.content === "") {
    return res.status(401).send({
      message: "Le champ 'Contenu' ne peut pas être vide sans image",
    });
  }
  // Ont sauvegarde une publication
  db.Publications.create({
    title: req.body.title,
    content: req.body.content,
    attachment: req.file ? ` ${req.protocol}://${req.get("host")}/uploads/${req.file.filename}` : null,
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
  const authorID = req.params.id;
  db.Publications.findAll({
    where: { UserId: authorID },
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: db.Users,
        attributes: ["username", "roles", "profileImage", "id"],
      },
      {
        model: db.PublicationsLikes,
        required: false,
        where: { userId: getIdUser(req) },
        nest: true,
        attributes: ["state", "UserId"],
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Une erreur à été rencontré lors de la récupération des publication de l'auteur avec l'id=" + authorID,
      });
    });
};

// Ont récupère une publication par son ID
exports.getOnePublication = async (req, res) => {
  const paramsId = req.params.id;

  db.Publications.findByPk(paramsId, {
    order: [[db.Comments, "createdAt", "DESC"]],
    where: { PublicationId: req.body.PublicationId },
    include: [
      {
        model: db.Users,
        attributes: ["username", "roles", "profileImage", "id"],
      },
      {
        model: db.PublicationsLikes,
        required: false,
        where: { userId: getIdUser(req) },
        nest: true,
        attributes: ["state", "UserId"],
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
        message: "Une erreur à été rencontré lors de la récupération de la publication avec l'id=" + paramsId,
      });
    });
};

// Ont récupère toutes les publications disponnibles en base de données
exports.getAllPublications = async (req, res) => {
  db.Publications.findAll({
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: db.Users,
        attributes: ["username", "roles", "profileImage"],
      },
      {
        model: db.PublicationsLikes,
        required: false,
        where: { userId: getIdUser(req) },
        nest: true,
        attributes: ["state", "UserId"],
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Une erreur à été rencontré lors de la récupérations des publications",
      });
    });
};

// Ont supprime une publication par son ID
exports.deleteOnePublication = async (req, res) => {
  try {
    const paramsId = req.params.id;
    const post = await db.Publications.findByPk(paramsId);
    const deletePublication = () => {
      db.Comments.destroy({ where: { PublicationId: paramsId }, UserId: getIdUser(req) });
      db.Publications.destroy({
        where: { id: paramsId },
        UserId: getIdUser(req),
      });
      db.PublicationsLikes.destroy({
        where: { PublicationId: paramsId },
        UserId: getIdUser(req),
      });
    };
    if (post.attachment === null) {
      deletePublication();
    } else {
      const filename = post.attachment.split("/uploads/")[1];
      fs.unlink(`uploads/${filename}`, () => {
        deletePublication();
      });
    }
    return res.status(200).send({
      message: "La publication à été supprimer avec succès!",
    });
  } catch (e) {
    return res.status(500).send({
      message: "La publication avec n'a pas plus être supprimer",
    });
  }
};

// Ont like une publication par son ID
exports.likePublication = async (req, res) => {
  try {
    const paramsId = req.params.id;
    const alreadyLiked = await db.PublicationsLikes.findOne({
      where: { userId: getIdUser(req), PublicationId: paramsId, state: "liked" },
    });
    const alreadyDisliked = await db.PublicationsLikes.findOne({
      where: { userId: getIdUser(req), PublicationId: paramsId, state: "disliked" },
    });
    if (alreadyDisliked) {
      await db.PublicationsLikes.destroy({
        where: { UserId: getIdUser(req), PublicationId: paramsId, state: "disliked" },
      });
      await db.Publications.decrement({ dislike: 1 }, { where: { id: paramsId } });
      await db.PublicationsLikes.create({
        PublicationId: paramsId,
        UserId: getIdUser(req),
        state: "liked",
      });
      await db.Publications.increment({ like: 1 }, { where: { id: paramsId } });
      res.status(200).send({ message: "Annulation du dislike car vous avez voulu like !" });
      return;
    }

    if (!alreadyLiked) {
      await db.PublicationsLikes.create({
        PublicationId: paramsId,
        UserId: getIdUser(req),
        state: "liked",
      });
      await db.Publications.increment({ like: 1 }, { where: { id: paramsId } });
      res.status(200).send({ message: "Le like à été pris en compte avec succès" });
      return;
    } else {
      await db.PublicationsLikes.destroy({
        where: { UserId: getIdUser(req), PublicationId: paramsId, state: "liked" },
      });
      await db.Publications.decrement({ like: 1 }, { where: { id: paramsId } });
      res.status(200).send({ message: "L'annulation du like à été pris en compte avec succès" });
      return;
    }
  } catch (error) {
    return res.status(500).send({ message: "Une erreur serveur à été rencontré !" });
  }
};

// Ont dislike une publication par son ID
exports.dislikePublication = async (req, res) => {
  try {
    const paramsId = req.params.id;
    const alreadyLiked = await db.PublicationsLikes.findOne({
      where: { userId: getIdUser(req), PublicationId: paramsId, state: "liked" },
    });
    const alreadyDisliked = await db.PublicationsLikes.findOne({
      where: { userId: getIdUser(req), PublicationId: paramsId, state: "disliked" },
    });
    if (alreadyLiked) {
      await db.PublicationsLikes.destroy({
        where: { UserId: getIdUser(req), PublicationId: paramsId, state: "liked" },
      });
      await db.Publications.decrement({ like: 1 }, { where: { id: paramsId } });
      await db.PublicationsLikes.create({
        PublicationId: paramsId,
        UserId: getIdUser(req),
        state: "disliked",
      });
      await db.Publications.increment({ dislike: 1 }, { where: { id: paramsId } });
      res.status(200).send({ message: "Annulation du like car vous avez voulu dislike !" });
      return;
    }
    if (!alreadyDisliked) {
      await db.PublicationsLikes.create({
        PublicationId: paramsId,
        UserId: getIdUser(req),
        state: "disliked",
      });
      await db.Publications.increment({ dislike: 1 }, { where: { id: paramsId } });
      res.status(200).send({ message: "Le dislike à été pris en compte avec succès" });
      return;
    } else {
      await db.PublicationsLikes.destroy({
        where: { UserId: getIdUser(req), PublicationId: paramsId, state: "disliked" },
      });
      await db.Publications.decrement({ dislike: 1 }, { where: { id: paramsId } });
      res.status(200).send({ message: "L'annulation du dislike à été pris en compte avec succès" });
      return;
    }
  } catch (error) {
    return res.status(500).send({ message: "Une erreur serveur à été rencontré !" });
  }
};

// ADMIN
// Ont supprime une publication par son ID
exports.AdminDeleteOnePublication = async (req, res) => {
  try {
    const paramsId = req.params.id;
    const post = await db.Publications.findByPk(paramsId);
    const deletePublication = () => {
      db.Publications.destroy({
        where: { id: paramsId },
      });
      db.PublicationsLikes.destroy({
        where: { PublicationId: paramsId },
      });
    };
    if (post.attachment === null) {
      deletePublication();
    } else {
      const filename = post.attachment.split("/uploads/")[1];
      fs.unlink(`uploads/${filename}`, () => {
        deletePublication();
      });
      console.log("ITS OKAY NOW");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: "La publication avec n'a pas plus être supprimer",
    });
  }
};
