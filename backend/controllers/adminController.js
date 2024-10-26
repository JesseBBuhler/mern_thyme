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

  const recipe = await recipeModel.findOneAndDelete({ _id: id });

  if (!recipe) {
    return res.status(404).json({ error: `No recipe with id ${id} found.` });
  }

  res.status(200).json(recipe);
};

// ----- Blogs ------------------

const addBlog = async (req, res) => {
  const { title, text, coverImgURL, tags } = req.body;
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
    res.status(200).json(blog.getPublicInfo());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editBlog = async (req, res) => {
  const { id } = req.params;
  const updateFields = ({ title, text, coverImgURL, author, tags } = req.body);

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

  res.status(200).json(blog);
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(404).json({ error: `${id} is not a valid blog id.` });
  }

  const blog = await blogModel.findOneAndDelete({ _id: id });

  if (!blog) {
    return res.status(404).json({ error: `No blog with id ${id} found.` });
  }

  res.status(200).json(blog);
};

const addRecipeToBlog = async (req, res) => {
  try {
    //get blog id
    const { id } = req.params;
    //get recipe ids
    const { recipesToAdd } = req.body;

    //check if valid blog id
    if (!isValidObjectId(id)) {
      return res.status(404).json({
        error: `${id} is not a valid blog id.`,
      });
    }

    //check if valid recipe ids
    const invalidIds = [];

    for (let i = 0; i < recipesToAdd.length; i++) {
      if (!isValidObjectId(recipesToAdd[i])) {
        invalidIds.push(recipesToAdd[i]);
      }
    }

    if (invalidIds.length > 0) {
      return res.status(404).json({ error: `id: ${invalidIds} invalid` });
    }

    //check if recipes in database
    const recipes = [];

    for (let i = 0; i < recipesToAdd.length; i++) {
      let recipe = await recipeModel.findById(recipesToAdd[i]);
      if (!recipe) {
        invalidIds.push(recipesToAdd[i]);
      } else {
        recipes.push(recipe);
      }
    }

    if (invalidIds.length > 0) {
      return res.status(404).json({ error: `id: ${invalidIds} not found` });
    }

    //check if blog in database
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).json({
        error: `blogID: ${id} not found.`,
      });
    }

    for (let i = 0; i < recipes.length; i++) {
      //check if recipe is already in blog
      if (!blog.recipes.includes(recipes[i]._id)) {
        blog.recipes.push(recipes[i]._id); //add to blog
      }

      //check if blog is already in recipe
      if (!recipes[i].blogs.includes(id)) {
        recipes[i].blogs.push(id); //add to recipe
      }

      //save recipe document
      await recipes[i].save();
    }

    // save blog
    await blog.save();

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeRecipeFromBlog = async (req, res) => {
  try {
    //get blog id
    const { id } = req.params;
    //get recipe ids
    const { recipesToRemove } = req.body;

    //check if valid blog id
    if (!isValidObjectId(id)) {
      return res.status(404).json({
        error: `${id} is not a valid blog id.`,
      });
    }

    //check if valid recipe ids
    const invalidIds = [];

    for (let i = 0; i < recipesToRemove.length; i++) {
      if (!isValidObjectId(recipesToRemove[i])) {
        invalidIds.push(recipesToRemove[i]);
      }
    }

    if (invalidIds.length > 0) {
      return res.status(404).json({ error: `id: ${invalidIds} invalid` });
    }

    //check if recipes in database
    const recipes = [];

    for (let i = 0; i < recipesToRemove.length; i++) {
      let recipe = await recipeModel.findById(recipesToRemove[i]);
      if (!recipe) {
        invalidIds.push(recipesToRemove[i]);
      } else {
        recipes.push(recipe);
      }
    }

    if (invalidIds.length > 0) {
      return res.status(404).json({ error: `id: ${invalidIds} not found` });
    }

    //check if blog in database
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).json({
        error: `blogID: ${id} not found.`,
      });
    }

    for (let i = 0; i < recipes.length; i++) {
      //remove recipe from blog
      blog.recipes = blog.recipes.filter(
        (id) => id.toString() !== recipes[i]._id.toString()
      );

      // Remove blog from recipe
      let blogID = id;
      recipes[i].blogs = recipes[i].blogs.filter(
        (id) => id.toString() !== blogID.toString()
      );

      //save recipe document
      await recipes[i].save();
    }

    // save blog
    await blog.save();

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
  addRecipeToBlog,
  removeRecipeFromBlog,
  editCommentFlags,
  deleteComment,
};
