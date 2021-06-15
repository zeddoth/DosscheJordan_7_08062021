module.exports = (app) => {
  const commentController = require("../controllers/Comments");
  const express = require("express");
  const router = express.Router();

  router.get("/comments/:id", commentController.getComments);
  router.post("/comments", commentController.createComment);
  router.delete("/comments/:id", commentController.deleteComment);
  router.delete("/comments/:PublicationId/all", commentController.deleteAllComments);

  app.use("/api", router);
};
