const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  editUser,
  deleteUser,
  signUp,
  logIn,
  editUserAccess,
  getPublicUsers,
  getPublicUser,
} = require("../controllers/userController");

router.get("/", getUsers);
router.get("/:id", getUser);
router.patch("/:id", editUser);
router.delete("/:id", deleteUser);
router.post("/signup", signUp);
router.post("/login", logIn);
router.patch("/:id/admin", editUserAccess);
router.get("/public", getPublicUsers);
router.get("/public/:id", getPublicUser);

module.exports = router;
