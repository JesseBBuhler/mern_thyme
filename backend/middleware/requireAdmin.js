const requireAdmin = (req, res, next) => {
  if (req.user.accessLevel !== "admin") {
    return res
      .status(401)
      .json({ error: "admin privileges are required to access this route." });
  }
  next();
};

module.exports = requireAdmin;
