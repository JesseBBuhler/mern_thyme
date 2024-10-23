const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    cuisineType: { type: String, required: true },
    prepTime: { type: Number, required: true },
    cookTime: { type: Number, required: true },
    servings: { type: Number, required: true },
    ingredients: [{ type: String, required: true }],
    instructions: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "user", required: true }, // one to many relationship
    blogs: [{ type: Schema.Types.ObjectId, ref: "blog" }], //many to many relationship
    tags: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("recipe", recipeSchema);
