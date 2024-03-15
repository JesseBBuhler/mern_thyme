const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("get info for all recipes");
});

router.post("/", (req, res) => {
  res.send("create new recipe");
});

router.get("/:id", (req, res) => {
  res.send("get info for recipe with id " + req.params.id);
});

router.patch("/:id", (req, res) => {
  res.send("edit recipe with id " + req.params.id);
});

router.delete("/:id", (req, res) => {
  res.send("delete recipe with id " + req.params.id);
});

module.exports = router;
