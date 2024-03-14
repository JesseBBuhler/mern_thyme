require("dotenv").config();

const express = require("express");
const app = express();

const sayHi = (req, res) => {
  res.status(200).json({ mssg: "Hello World" });
};

app.get("/hi", sayHi);

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
