const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("get info for all users");
});

router.get("/:id", (req, res) => {
  res.send("get info for user with id " + req.params.id);
});

router.patch("/:id", (req, res) => {
  res.send("edit info for user with id " + req.params.id);
});

router.delete("/:id", (req, res) => {
  res.send("delete user with id " + req.params.id);
});

router.post("/signup", (req, res) => {
  res.send("sign up a new user");
});

router.post("/login", (req, res) => {
  res.send("log in an existing user");
});

module.exports = router;
