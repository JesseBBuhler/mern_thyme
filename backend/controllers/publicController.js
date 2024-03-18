const getAllPublicUsersInfo = (req, res) => {
  res.send("public info for all users");
};

const signUpUser = (req, res) => {
  res.send("sign up a new user");
};

const loginUser = (req, res) => {
  res.send("login a user");
};

const getPublicUserInfo = (req, res) => {
  res.send("public info for one user");
};

const getAllRecipes = (req, res) => {
  res.send("all recipes");
};

const getRecipe = (req, res) => {
  res.send("one recipe");
};

const getAllBlogs = (req, res) => {
  res.send("all blogs");
};

const getBlog = (req, res) => {
  res.send("one blog");
};

const getAllCommentsOnBlog = (req, res) => {
  res.send("all comments on one blog");
};

const getCommentOnBlog = (req, res) => {
  res.send("one comment on one blog");
};

const editCommentOnBlog = (req, res) => {
  res.send("edit one comment on one blog");
};

const deleteCommentOnBlog = (req, res) => {
  res.send("delete one comment on one blog");
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
  editCommentOnBlog,
  deleteCommentOnBlog,
};
