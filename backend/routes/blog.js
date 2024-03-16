const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  createBlog,
  getBlog,
  editBlog,
  deleteBlog,
} = require("../controllers/blogController");
const commentRoutes = require("./comment");

router.get("/", getAllBlogs);
router.post("/", createBlog);
router.get("/:id", getBlog);
router.patch("/:id", editBlog);
router.delete("/:id", deleteBlog);
router.use("/:id/comment", commentRoutes);

module.exports = router;
