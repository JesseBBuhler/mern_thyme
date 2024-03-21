const { isValidObjectId } = require("mongoose");
const userModel = require("../models/userModel");

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
    return res.status(404).json({ error: `No user with id ${id} found.` });
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
    return res.status(404).json({ error: `No user with id ${id} found.` });
  }

  const user = await userModel.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(404).json({ error: `No user with id ${id} found.` });
  }

  res.status(200).json(user);
};

const addRecipe = (req, res) => {
  res.send("add a new recipe");
};

const editRecipe = (req, res) => {
  res.send("edit recipe");
};

const deleteRecipe = (req, res) => {
  res.send("delete recipe");
};

const addBlog = (req, res) => {
  res.send("add a new blog");
};

const editBlog = (req, res) => {
  res.send("edit blog");
};

const deleteBlog = (req, res) => {
  res.send("delete blog");
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
