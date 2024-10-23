const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    text: { Type: String, required: true },
    title: { Type: String, required: true },
    coverImgURL: { Type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "user", required: true }, // one to many relationship
    recipes: [{ type: Schema.Types.ObjectId, ref: "recipe" }], //many to many relationship
    tags: [{ Type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("blog", blogSchema);
