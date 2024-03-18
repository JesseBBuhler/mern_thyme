const express = require("express");
const router = express.Router();
const {
  getAllPublicUsersInfo,
  signUpUser,
  loginUser,
  getPublicUserInfo,
  getAllRecipes,
  getRecipe,
  getAllBlogs,
  getBlog,
  getAllCommentsOnBlog,
  getCommentOnBlog,
  editCommentOnBlog,
  deleteCommentOnBlog,
} = require("../controllers/publicController");

router.get("/user", getAllPublicUsersInfo);
router.post("/user/signup", signUpUser);
router.post("/user/login", loginUser);
router.get("/user/:id", getPublicUserInfo);

router.get("/recipe", getAllRecipes);
router.get("/recipe/:id", getRecipe);

router.get("/blog", getAllBlogs);
router.get("/blog/:id", getBlog);
router.get("/blog/:id/comments", getAllCommentsOnBlog);
router.get("/blog/:id/comments/:commentid", getCommentOnBlog);
router.patch("/blog/:id/comments/:commentid", editCommentOnBlog);
router.delete("/blog/:id/comments/:commentid", deleteCommentOnBlog);

module.exports = router;
