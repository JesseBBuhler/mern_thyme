const { isValidObjectId } = require("mongoose");
const userModel = require("../models/userModel");
const recipeModel = require("../models/recipeModel");
const blogModel = require("../models/blogModel");

const getAllUsersInfo = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await userModel.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ error: `No user found with id of ${id}` });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const editUserInfo = async (req, res) => {
  const { id } = req.params;
  const { accessLevel, standing } = req.body;

  if (!isValidObjectId(id)) {
    return res.status(404).json({ error: `${id} is not a valid user id.` });
  }

  const updateObject = {};
  if (accessLevel !== null && accessLevel !== undefined) {
    updateObject.accessLevel = accessLevel;
  }
  if (standing !== null && standing !== undefined) {
    updateObject.standing = standing;
  }

  const user = await userModel.findOneAndUpdate(
    { _id: id },
    { $set: updateObject },
    { new: true } // This option returns the updated document
  );

  if (!user) {
    return res.status(404).json({ error: `No user with id ${id} found.` });
  }

  res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(404).json({ error: `${id} is not a valid user id.` });
  }

  const user = await userModel.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(404).json({ error: `No user with id ${id} found.` });
  }

  res.status(200).json(user);
};

// ----- Recipes ------------------

const addRecipe = async (req, res) => {
  const {
    title,
    instructions,
    ingredients,
    servings,
    cookTime,
    prepTime,
    cuisineType,
    tags,
  } = req.body;

  let emptyFields = [];

  if (!title) emptyFields.push("title");
  if (!instructions) emptyFields.push("instructions");
  if (!ingredients) emptyFields.push("ingredients");
  if (!servings) emptyFields.push("servings");
  if (cookTime === null || cookTime === undefined) emptyFields.push("cookTime");
  if (prepTime === null || prepTime === undefined) emptyFields.push("prepTime");
  if (!cuisineType) emptyFields.push("cuisineType");

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please include the following fields: ", emptyFields });
  }

  // add doc to db
  try {
    const author = req.user;
    const recipe = await recipeModel.create({
      cuisineType,
      prepTime,
      cookTime,
      servings,
      ingredients,
      instructions,
      title,
      author,
      tags,
    });

    res.status(200).json(recipe.getPublicInfo());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editRecipe = async (req, res) => {
  const { id } = req.params;
  const updateFields = ({
    title,
    cuisineType,
    ingredients,
    instructions,
    prepTime,
    cookTime,
    servings,
    author,
    tags,
  } = req.body);

  if (!isValidObjectId(id)) {
    return res.status(404).json({ error: `${id} is not a valid recipe id.` });
  }

  const updateObject = {};

  Object.keys(updateFields).forEach((key) => {
    if (updateFields[key] !== null && updateFields[key] !== undefined) {
      updateObject[key] = updateFields[key];
    }
  });

  const recipe = await recipeModel.findOneAndUpdate(
    { _id: id },
    { $set: updateObject },
    { new: true } // This option returns the updated document
  );

  if (!recipe) {
    return res.status(404).json({ error: `No recipe with id ${id} found.` });
  }

  res.status(200).json(recipe);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(404).json({ error: `${id} is not a valid recipe id.` });
  }

  const deletedRecipe = await recipeModel.findOneAndDelete({ _id: id });

  if (!deletedRecipe) {
    return res.status(404).json({ error: `No recipe with id ${id} found.` });
  }

  //remove recipe from any associated blogs
  deletedRecipe.blogs.map((blog) => {
    blog.recipes = blog.recipes.filter(
      (recipe) => toString(recipe._id) != deletedRecipe._id
    );
    blog.save();
  });

  res.status(200).json(recipe);
};

// ----- Blogs ------------------

const addRecipesToBlog = async (recipes, blog) => {
  //check if valid recipe ids
  const invalidIds = [];

  for (let i = 0; i < recipes.length; i++) {
    if (!isValidObjectId(recipes[i])) {
      invalidIds.push(recipes[i]);
    }
  }

  if (invalidIds.length > 0) {
    throw new Error(`id: ${invalidIds} invalid`);
  }

  //check if recipes in database
  const validRecipes = [];

  for (let i = 0; i < recipes.length; i++) {
    let recipe = await recipeModel.findById(recipes[i]);
    if (!recipe) {
      invalidIds.push(recipes[i]);
    } else {
      validRecipes.push(recipe);
    }
  }

  if (invalidIds.length > 0) {
    throw new Error(`id: ${invalidIds} not found`);
  }

  //create list of recipes to add and recipes to remove
  const recipesToAdd = recipes.filter(
    (recipe) => !blog.recipes.includes(recipe._id)
  ); //items in recipes that are not in blog.recipes
  const recipesToRemove = blog.recipes.filter(
    (recipe) => !recipes.includes(recipe._id)
  ); //items in blog.recipes that are not in recipes

  //remove recipes to remove
  for (let i = 0; i < recipesToRemove.length; i++) {
    //remove recipe from blog
    blog.recipes = blog.recipes.filter(
      (id) => id.toString() !== recipesToRemove[i]._id.toString()
    );

    // Remove blog from recipe
    recipesToRemove[i].blogs = recipesToRemove[i].blogs.filter(
      (id) => id.toString() !== blog._id.toString()
    );

    //save recipe document
    await recipesToRemove[i].save();
  }

  //add recipes to add
  for (let i = 0; i < recipesToAdd.length; i++) {
    blog.recipes.push(recipesToAdd[i]._id); //add recipe to blog

    recipesToAdd[i].blogs.push(blog._id); //add blog to recipe

    //save recipe document
    await recipesToAdd[i].save();
  }

  // save blog
  await blog.save();
};

const addBlog = async (req, res) => {
  const { title, text, coverImgURL, tags, recipes } = req.body;
  let emptyFields = [];
  if (!title) emptyFields.push("title");
  if (!text) emptyFields.push("text");
  if (!coverImgURL) emptyFields.push("coverImgURL");
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please include the following fields: ", emptyFields });
  }
  // add doc to db
  try {
    const author = req.user;
    const blog = await blogModel.create({
      title,
      text,
      coverImgURL,
      author,
      tags,
    });

    addRecipesToBlog(recipes, blog);
    res.status(200).json(blog.getPublicInfo());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = ({ title, text, coverImgURL, author, tags, recipes } =
      req.body);

    if (!isValidObjectId(id)) {
      return res.status(404).json({ error: `${id} is not a valid blog id.` });
    }

    const updateObject = {};

    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key] !== null && updateFields[key] !== undefined) {
        updateObject[key] = updateFields[key];
      }
    });

    const blog = await blogModel.findOneAndUpdate(
      { _id: id },
      { $set: updateObject },
      { new: true } // This option returns the updated document
    );

    if (!blog) {
      return res.status(404).json({ error: `No blog with id ${id} found.` });
    }

    addRecipesToBlog(recipes, blog);

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(404).json({ error: `${id} is not a valid blog id.` });
  }

  const deletedBlog = await blogModel.findOneAndDelete({ _id: id });

  if (!deletedBlog) {
    return res.status(404).json({ error: `No blog with id ${id} found.` });
  }

  //remove blog from any associated recipes
  deletedBlog.recipes.map((recipe) => {
    recipe.blogs = recipe.blogs.filter(
      (blog) => toString(blog._id) !== toString(deletedBlog._id)
    );
    recipe.save();
  });

  res.status(200).json(deletedBlog);
};

const editCommentFlags = (req, res) => {
  res.send("edit comment flags");
};

const deleteComment = (req, res) => {
  res.send("delete comment");
};

module.exports = {
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
  editCommentFlags,
  deleteComment,
};
