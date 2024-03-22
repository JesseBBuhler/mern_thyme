const { isValidObjectId } = require("mongoose");
const userModel = require("../models/userModel");

const getUserInfo = async (req, res) => {
  try {
    const id = req.user._id;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await userModel.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ error: `No user found with id of ${id}` });
    }

    res.status(200).json(user.getPrivateInfo());
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const editUser = async (req, res) => {
  try {
    const id = req.user._id;
    const { userName, email } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const updateObject = {};
    if (userName !== null && userName !== undefined) {
      updateObject.userName = userName;
    }
    if (email !== null && email !== undefined) {
      updateObject.email = email;
    }

    const user = await userModel.findOneAndUpdate(
      { _id: id },
      { $set: updateObject },
      { new: true } // This option returns the updated document
    );
    if (!user) {
      return res.status(404).json({ error: `No user found with id of ${id}` });
    }

    res.status(200).json(user.getPrivateInfo());
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const id = req.user._id;
    const { newPassword, oldPassword } = req.body;
    if (!isValidObjectId(id)) {
      return res.status(404).json({ error: `No user with id ${id} found.` });
    }

    const user = await userModel.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ error: `No user found with id of ${id}` });
    }
    const update = await user.changePassword(oldPassword, newPassword);

    res.status(200).json(update);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const id = req.user._id;

  if (!isValidObjectId(id)) {
    return res.status(404).json({ error: `No user with id ${id} found.` });
  }

  const user = await userModel.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(404).json({ error: `No user with id ${id} found.` });
  }

  res.status(200).json(user);
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
  resetPassword,
  deleteUser,
  rateRecipe,
  commentOnBlog,
  editBlogComment,
};
