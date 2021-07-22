module.exports = (app) => {
  const userController = require("../controllers/Users");
  const express = require("express");
  const auth = require("../middleware/auth");
  const isAdmin = require("../middleware/isAdmin");
  const router = express.Router();
  const multerM = require("../middleware/multer-config-img");

  router.post("/login", userController.login);
  router.post("/signup", userController.signup);
  router.get("/profile/:id", auth, userController.getUser);
  router.get("/profiles/", auth, userController.getAllUsers);
  router.delete("/profile/:id", auth, userController.deleteUser);
  router.put("/profile/:id", auth, userController.editUser);
  router.put("/profile/:id/password", auth, userController.editPassword);
  router.put("/profile/:id/image", auth, multerM, userController.editProfileImage);

  // ROUTES ADMIN
  router.put("/admin/profile/:id/roles", auth, isAdmin, userController.AdminEditRole);
  router.delete("/admin/profile/:id", auth, isAdmin, userController.AdminDeleteUser);

  app.use("/api", router);
};
