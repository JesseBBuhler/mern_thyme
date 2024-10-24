const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    text: { type: String, required: true },
    title: { type: String, required: true },
    coverImgURL: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "user", required: true }, // one to many relationship
    recipes: [{ type: Schema.Types.ObjectId, ref: "recipe" }], //many to many relationship
    tags: [{ type: String }],
  },
  { timestamps: true }
);

blogSchema.methods.getPublicInfo = function () {
  const authorInfo = this.author._id;

  return {
    _id: this.id,
    title: this.title,
    text: this.text,
    coverImgURL: this.coverImgURL,
    author: authorInfo,
    recipes: this.recipes,
    tags: this.tags,
  };
};

module.exports = mongoose.model("blog", blogSchema);
