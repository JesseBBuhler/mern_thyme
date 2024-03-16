const express = require("express");
const router = express.Router();
const {
  getRecipes,
  getRecipe,
  createRecipe,
  editRecipe,
  deleteRecipe,
  rateRecipe,
} = require("../controllers/recipeController");

router.get("/", getRecipes);
router.post("/", createRecipe);
router.get("/:id", getRecipe);
router.patch("/:id", editRecipe);
router.delete("/:id", deleteRecipe);
router.post("/:id/rate", rateRecipe);

module.exports = router;
