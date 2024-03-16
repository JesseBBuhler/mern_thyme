const getUsers = (req, res) => {
  res.send("get info for all users");
};

const getUser = (req, res) => {
  res.send("get info for user with id " + req.params.id);
};

const editUser = (req, res) => {
  res.send("edit info for user with id " + req.params.id);
};

const deleteUser = (req, res) => {
  res.send("delete user with id " + req.params.id);
};

const signUp = (req, res) => {
  res.send("sign up a new user");
};

const logIn = (req, res) => {
  res.send("log in an existing user");
};

const editUserAccess = (req, res) => {
  res.send("edit user access");
};

module.exports = {
  getUsers,
  getUser,
  editUser,
  deleteUser,
  signUp,
  logIn,
  editUserAccess,
};
