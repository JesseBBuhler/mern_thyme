const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ratingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    recipe: { type: Schema.Types.ObjectId, ref: "recipe", required: true },
    rating: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("rating", ratingSchema);
