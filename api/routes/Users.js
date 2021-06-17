module.exports = (app) => {
  const userController = require("../controllers/Users");
  const express = require("express");
  const auth = require("../middleware/auth");
  const router = express.Router();

  router.post("/login", userController.login);
  router.post("/signup", userController.signup);
  router.get("/profile/:id", auth, userController.getUser);
  router.get("/profiles/", auth, userController.getAllUsers);
  router.delete("/profile/:id", auth, userController.deleteUser);
  router.put("/profile/:id", auth, userController.editUser);
  router.put("/profile/:id/password", auth, userController.editPassword);
  router.put("/profile/:id/roles", auth, userController.editRole);

  app.use("/api", router);
};
