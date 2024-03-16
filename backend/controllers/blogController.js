const getAllBlogs = (req, res) => {
  res.send("get info for all blogs");
};

const createBlog = (req, res) => {
  res.send("create new blog");
};

const getBlog = (req, res) => {
  res.send("get info for blog with id " + req.params.id);
};

const editBlog = (req, res) => {
  res.send("edit blog with id " + req.params.id);
};

const deleteBlog = (req, res) => {
  res.send("delete blog with id " + req.params.id);
};

module.exports = {
  getAllBlogs,
  createBlog,
  getBlog,
  editBlog,
  deleteBlog,
};
