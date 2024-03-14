require("dotenv").config();
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");
const recipeRoutes = require("./routes/recipe");

const express = require("express");
const app = express();

//middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/recipe", recipeRoutes);

//start app
app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
