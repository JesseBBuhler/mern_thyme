const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  editUser,
  deleteUser,
  signUp,
  logIn,
} = require("../controllers/userController");

router.get("/", getUsers);
router.get("/:id", getUser);
router.patch("/:id", editUser);
router.delete("/:id", deleteUser);
router.post("/signup", signUp);
router.post("/login", logIn);

module.exports = router;
