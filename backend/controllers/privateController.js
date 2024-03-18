const getUserInfo = (req, res) => {
  res.send("all info for one user");
};

const editUser = (req, res) => {
  res.send("edit user");
};

const deleteUser = (req, res) => {
  res.send("delete user");
};

const rateRecipe = (req, res) => {
  res.send("rate recipe");
};

const commentOnBlog = (req, res) => {
  res.send("comment on a blog");
};

const editBlogComment = (req, res) => {
  res.send("edit comment on a blog");
};

module.exports = {
  getUserInfo,
  editUser,
  deleteUser,
  rateRecipe,
  commentOnBlog,
  editBlogComment,
};
