const express = require("express");
const router = express.Router();
const {
  getAllUsersInfo,
  getUserInfo,
  editUserInfo,
  deleteUser,
  addRecipe,
  editRecipe,
  deleteRecipe,
  addBlog,
  editBlog,
  deleteBlog,
  addRecipeToBlog,
  removeRecipeFromBlog,
  editCommentFlags,
  deleteComment,
} = require("../controllers/adminController");
const requireAuth = require("../middleware/requireAuth");
const requireAdmin = require("../middleware/requireAdmin");

//middleware
router.use(requireAuth);
router.use(requireAdmin);

router.get("/user", getAllUsersInfo);
router.get("/user/:id", getUserInfo);
router.patch("/user/:id", editUserInfo);
router.delete("/user/:id", deleteUser);

router.post("/recipe", addRecipe);
router.patch("/recipe/:id", editRecipe);
router.delete("/recipe/:id", deleteRecipe);

router.post("/blog", addBlog);
router.patch("/blog/:id", editBlog);
router.delete("/blog/:id", deleteBlog);

router.post("/blog/:id/add-recipe", addRecipeToBlog);
router.post("/blog/:id/remove-recipe", removeRecipeFromBlog);

router.patch("/blog/:id/comment/:commentid", editCommentFlags);
router.delete("/blog/:id/comment/:commentid", deleteComment);

module.exports = router;
