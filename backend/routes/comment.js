const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getAllComments,
  createComment,
  getComment,
  editComment,
  deleteComment,
} = require("../controllers/commentController");

router.get("/", getAllComments);
router.post("/", createComment);
router.get("/:commentid", getComment);
router.patch("/:commentid", editComment);
router.delete("/:commentid", deleteComment);

module.exports = router;
