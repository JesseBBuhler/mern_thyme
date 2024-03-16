const getRecipes = (req, res) => {
  res.send("get info for all recipes");
};

const getRecipe = (req, res) => {
  res.send("get info for recipe with id " + req.params.id);
};

const createRecipe = (req, res) => {
  res.send("create new recipe");
};

const editRecipe = (req, res) => {
  res.send("edit recipe with id " + req.params.id);
};

const deleteRecipe = (req, res) => {
  res.send("delete recipe with id " + req.params.id);
};

const rateRecipe = (req, res) => {
  res.send("rate recipe with id " + req.params.id);
};

module.exports = {
  getRecipes,
  getRecipe,
  createRecipe,
  editRecipe,
  deleteRecipe,
  rateRecipe,
};
