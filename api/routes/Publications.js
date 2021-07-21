module.exports = (app) => {
  const publicationController = require("../controllers/Publications");
  const express = require("express");
  const auth = require("../middleware/auth");
  const isAdmin = require("../middleware/isAdmin");
  const multerM = require("../middleware/multer-config");
  const router = express.Router();

  router.get("/posts/:id", auth, publicationController.getOnePublication);
  router.get("/posts", auth, publicationController.getAllPublications);
  router.post("/posts", auth, multerM, publicationController.createPublication);
  router.delete("/posts/:id", auth, publicationController.deleteOnePublication);
  router.get("/posts/author/:id", auth, publicationController.getPublicationByAuthor);
  router.put("/posts/:id/like", auth, publicationController.likePublication);
  router.put("/posts/:id/dislike", auth, publicationController.dislikePublication);

  // ROUTES ADMIN
  router.delete("/admin/posts/:id", auth, isAdmin, publicationController.AdminDeleteOnePublication);
  app.use("/api", router);
};
