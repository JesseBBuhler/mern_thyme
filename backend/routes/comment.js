const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("get info for all comments on blog post with id " + req.params.id);
});

router.post("/", (req, res) => {
  res.send("create new comment on blog post with id " + req.params.id);
});

router.get("/:commentid", (req, res) => {
  res.send(
    "get info for comment with id " +
      req.params.commentid +
      " on blog post with id " +
      req.params.id
  );
});

router.patch("/:commentid", (req, res) => {
  res.send(
    "edit comment with id " +
      req.params.commentid +
      " on blog post with id " +
      req.params.id
  );
});

router.delete("/:commentid", (req, res) => {
  res.send(
    "delete comment with id " +
      req.params.commentid +
      " on blog post with id " +
      req.params.id
  );
});

module.exports = router;
