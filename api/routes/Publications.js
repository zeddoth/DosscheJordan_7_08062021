module.exports = (app) => {
  const publicationController = require("../controllers/Publications");
  const express = require("express");
  const auth = require("../middleware/auth");
  const router = express.Router();

  router.get("/posts/:id", auth, publicationController.getOnePublication);
  router.get("/posts", auth, publicationController.getAllPublications);
  router.post("/posts", auth, publicationController.createPublication);
  router.delete("/posts/:id", auth, publicationController.deleteOnePublication);
  router.delete("/posts", auth, publicationController.deleteAll);
  router.get("/posts/author/:id", auth, publicationController.getPublicationByAuthor);

  app.use("/api", router);
};
