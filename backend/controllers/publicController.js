const { isValidObjectId } = require("mongoose");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

// user ______________________________________
const getAllPublicUsersInfo = async (req, res) => {
  try {
    const users = await userModel.getAllPublicInfo();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const signUpUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const user = await userModel.signup(userName, email, password);
    const token = createToken(user._id);
    res.status(200).json({ userName: user.userName, token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await userModel.login(userName, password);
    const token = createToken(user._id);
    res.status(200).json({ userName: userName, token: token });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const getPublicUserInfo = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await userModel.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ error: `No user found with id of ${id}` });
    }

    res.status(200).json(user.getPublicInfo());
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

// recipe ______________________________________
const getAllRecipes = (req, res) => {
  res.send("all recipes");
};

const getRecipe = (req, res) => {
  res.send("one recipe");
};

// blog ______________________________________
const getAllBlogs = (req, res) => {
  res.send("all blogs");
};

const getBlog = (req, res) => {
  res.send("one blog");
};

// comment ______________________________________
const getAllCommentsOnBlog = (req, res) => {
  res.send("all comments on one blog");
};

const getCommentOnBlog = (req, res) => {
  res.send("one comment on one blog");
};

module.exports = {
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
};
