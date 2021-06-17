module.exports = (app) => {
  const commentController = require("../controllers/Comments");
  const express = require("express");
  const auth = require("../middleware/auth");
  const isAdmin = require("../middleware/isAdmin");
  const router = express.Router();

  router.get("/comments/:id", auth, commentController.getComments);
  router.post("/comments/:PublicationId", auth, commentController.createComment);
  router.delete("/comments/:id", auth, commentController.deleteComment);
  router.delete("/comments/:PublicationId/all", auth, commentController.deleteAllComments);

  //ROUTES ADMIN
  router.delete("/admin/comments/:id", auth, isAdmin, commentController.adminDeleteComment);

  app.use("/api", router);
};
