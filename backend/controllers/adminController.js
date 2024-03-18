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

const editUserInfo = (req, res) => {
  res.send("edit admin info on one user");
};

const deleteUser = (req, res) => {
  res.send("delete one user");
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
