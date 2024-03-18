const getAllUsersInfo = (req, res) => {
  res.send("get admin info on all users");
};

const getUserInfo = (req, res) => {
  res.send("get admin info on one user");
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
