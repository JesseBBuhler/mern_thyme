//imports
require("dotenv").config();
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");
const recipeRoutes = require("./routes/recipe");

//declare constants
const uri = process.env.MONGO_URI;
const dbName = process.env.DBNAME;
const fullURI = uri + "/" + dbName;
const port = process.env.PORT;

//create app
const express = require("express");
const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/recipe", recipeRoutes);

//start app
mongoose
  .connect(fullURI)
  .then(() => {
    console.log("connected to database");
    //start server
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database or launch server", error);
  });
