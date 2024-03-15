const express = require("express");
const commentRoutes = require("./comment");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("get info for all blogs");
});

router.post("/", (req, res) => {
  res.send("create new blog");
});

router.get("/:id", (req, res) => {
  res.send("get info for blog with id " + req.params.id);
});

router.patch("/:id", (req, res) => {
  res.send("edit blog with id " + req.params.id);
});

router.delete("/:id", (req, res) => {
  res.send("delete blog with id " + req.params.id);
});

router.use("/:id/comment", commentRoutes);

module.exports = router;
