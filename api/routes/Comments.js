module.exports = (app) => {
  const commentController = require("../controllers/Comments");
  const express = require("express");
  const auth = require("../middleware/auth");
  const isAdmin = require("../middleware/isAdmin");
  const router = express.Router();

  router.get("/comments/:id", auth, commentController.getComments);
  router.post("/comments/:PublicationId", auth, commentController.createComment);
  router.delete("/comments/:id", auth, commentController.deleteComment);

  //ROUTES ADMIN
  router.delete(
    "admin/comments/:PublicationId/all",
    auth,
    isAdmin,
    commentController.AdminDeleteAllComments
  );
  router.delete("/admin/comments/:id", auth, isAdmin, commentController.adminDeleteComment);

  app.use("/api", router);
};
