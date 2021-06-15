module.exports = (app) => {
  const publicationController = require("../controllers/Publications");
  const express = require("express");
  const router = express.Router();

  router.get("/posts/:id", publicationController.getOnePublication);
  router.get("/posts", publicationController.getAllPublications);
  router.post("/posts", publicationController.createPublication);
  router.delete("/posts/:id", publicationController.deleteOnePublication);
  router.delete("/posts", publicationController.deleteAll);
  router.get("/posts/author/:id", publicationController.getPublicationByAuthor);

  app.use("/api", router);
};
