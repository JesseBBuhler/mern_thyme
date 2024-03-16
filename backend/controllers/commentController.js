const getAllComments = (req, res) => {
  res.send("get info for all comments on blog post with id " + req.params.id);
};

const createComment = (req, res) => {
  res.send("create new comment on blog post with id " + req.params.id);
};

const getComment = (req, res) => {
  res.send(
    "get info for comment with id " +
      req.params.commentid +
      " on blog post with id " +
      req.params.id
  );
};

const editComment = (req, res) => {
  res.send(
    "edit comment with id " +
      req.params.commentid +
      " on blog post with id " +
      req.params.id
  );
};

const deleteComment = (req, res) => {
  res.send(
    "delete comment with id " +
      req.params.commentid +
      " on blog post with id " +
      req.params.id
  );
};

module.exports = {
  getAllComments,
  createComment,
  getComment,
  editComment,
  deleteComment,
};
