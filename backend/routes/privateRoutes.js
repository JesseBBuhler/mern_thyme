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
const requireAuth = require("../middleware/requireAuth");

//middleware
router.use(requireAuth);

router.get("/user/", getUserInfo);
router.patch("/user/", editUser);
router.delete("/user/", deleteUser);

router.post("/recipe/:id", rateRecipe);

router.post("/blog/:id", commentOnBlog);
router.patch("/blog/:id", editBlogComment);

module.exports = router;
