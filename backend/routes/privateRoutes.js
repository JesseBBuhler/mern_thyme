const express = require("express");
const router = express.Router();
const {
  getUserInfo,
  editUser,
  deleteUser,
  rateRecipe,
  commentOnBlog,
  editBlogComment,
} = require("../controllers/privateController");

router.get("/user/:id", getUserInfo);
router.patch("/user/:id", editUser);
router.delete("/user/:id", deleteUser);

router.post("/recipe/:id", rateRecipe);

router.post("/blog/:id", commentOnBlog);
router.patch("/blog/:id", editBlogComment);

module.exports = router;
