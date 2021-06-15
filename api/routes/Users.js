module.exports = (app) => {
  const userController = require("../controllers/Users");
  const express = require("express");
  const router = express.Router();

  router.post("/login", userController.login);
  router.post("/signup", userController.signup);
  router.get("/profile/:id", userController.getUser);
  router.delete("/profile/:id", userController.deleteUser);
  router.put("/profile/:id", userController.editUser);

  app.use("/api", router);
};
