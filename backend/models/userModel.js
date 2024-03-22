const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    accessLevel: {
      type: String,
      required: true,
    },
    standing: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// static signup method
// cannot use arrow function in functions that use "this"
userSchema.statics.signup = async function (userName, email, password) {
  //validation
  if (!email || !password || !userName) {
    throw Error("All fields must be filled");
  }

  const emailExists = await this.findOne({ email });
  const userNameExists = await this.findOne({ userName });

  if (emailExists) {
    throw Error("Email is already in use");
  }

  if (userNameExists) {
    throw Error("Username is already in use");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    userName,
    email,
    password: hash,
    accessLevel: "user",
    standing: "default",
  });

  return user;
};

// static login method
userSchema.statics.login = async function (userName, password) {
  if (!userName || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ userName });

  if (!user) {
    throw Error("Incorrect User Name");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

userSchema.methods.changePassword = async function (oldPassword, newPassword) {
  if (!oldPassword || !newPassword) {
    throw Error("All fields must be filled");
  }

  // Since this method is called on an instance of a user, `this` refers to the user document.
  const user = this;

  // Check if the old password is correct.
  const match = await bcrypt.compare(oldPassword, user.password);
  if (!match) {
    throw Error("Old password is incorrect");
  }

  // Validate the new password's strength.
  if (!validator.isStrongPassword(newPassword)) {
    throw Error("New password is not strong enough");
  }

  // Hash the new password.
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword, salt);

  // Update the user's password.
  user.password = hash;

  // Save the updated user document.
  return user.save();
};

userSchema.methods.getPublicInfo = function () {
  return {
    _id: this.id,
    userName: this.userName,
  };
};

userSchema.statics.getAllPublicInfo = async function () {
  const users = await this.find({});
  return users.map((user) => user.getPublicInfo());
};

userSchema.methods.getPrivateInfo = function () {
  return {
    _id: this.id,
    userName: this.userName,
    email: this.email,
    standing: this.standing,
    createdAt: this.createdAt,
  };
};

module.exports = mongoose.model("user", userSchema);
