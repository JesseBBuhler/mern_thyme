const { isValidObjectId } = require("mongoose");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
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

const editUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await userModel.findOneAndDelete({ _id: id });
    if (!user) {
      return res.status(404).json({ error: `No user found with id of ${id}` });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await userModel.findOneAndDelete({ _id: id });
    if (!user) {
      return res.status(404).json({ error: `No user found with id of ${id}` });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const signUp = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const user = await userModel.signup(userName, email, password);
    const token = createToken(user._id);
    res.status(200).json({ userName: user.userName, token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logIn = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = userModel.login(userName, password);
    const token = createToken(user._id);
    res.status(200).json({ userName: userName, token: token });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const editUserAccess = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await userModel.findOneAndDelete({ _id: id });
    if (!user) {
      return res.status(404).json({ error: `No user found with id of ${id}` });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const getPublicUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await userModel.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ error: `No user found with id of ${id}` });
    }

    const publicUser = {
      _id: user._id,
      userName: user.userName,
    };

    res.status(200).json(publicUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const getPublicUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    const publicUsers = users.map((user) => {
      const publicUser = {
        _id: user._id,
        userName: user.userName,
      };
      return publicUser;
    });
    res.status(200).json(publicUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getUsers,
  getUser,
  editUser,
  deleteUser,
  signUp,
  logIn,
  editUserAccess,
  getPublicUser,
  getPublicUsers,
};
