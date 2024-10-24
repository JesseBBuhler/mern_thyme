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

recipeSchema.methods.getPublicInfo = function () {
  const authorInfo = this.author._id;

  return {
    _id: this.id,
    title: this.title,
    cuisineType: this.cuisineType,
    ingredients: this.ingredients,
    instructions: this.instructions,
    prepTime: this.prepTime,
    cookTime: this.cookTime,
    servings: this.servings,
    author: authorInfo,
    tags: this.tags,
    blogs: this.blogs,
  };
};

recipeSchema.statics.getAllRecipeInfo = async function () {
  const recipes = await this.find({});

  return recipes.map((recipe) => recipe.getPublicInfo());
};

module.exports = mongoose.model("recipe", recipeSchema);
