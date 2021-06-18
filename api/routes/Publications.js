module.exports = (app) => {
  const publicationController = require("../controllers/Publications");
  const express = require("express");
  const auth = require("../middleware/auth");
  const isAdmin = require("../middleware/isAdmin");
  const router = express.Router();

  router.get("/posts/:id", auth, publicationController.getOnePublication);
  router.get("/posts", auth, publicationController.getAllPublications);
  router.post("/posts", auth, publicationController.createPublication);
  router.delete("/posts/:id", auth, publicationController.deleteOnePublication);
  router.get("/posts/author/:id", auth, publicationController.getPublicationByAuthor);

  // ROUTES ADMIN
  router.delete("/admin/posts", auth, isAdmin, publicationController.AdminDeleteAll);
  router.delete("/admin/posts/:id", auth, isAdmin, publicationController.AdminDeleteOnePublication);
  app.use("/api", router);
};
