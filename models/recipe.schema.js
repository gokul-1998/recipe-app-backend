const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: [String],
  description: { type: String, required: true },
  ingredients: [
    {
      name: { type: String, required: true },
      quantity: { type: String, required: true },
    },
  ],
  instructions: [{ type: String, required: true }],
  nutritionalValues: {
    calories: { type: String },
    protein: { type: String },
    carbohydrates: { type: String },
    fat: { type: String },
  },
  difficulty: { type: String },
  prepTime: { type: String },
  createdDate: { type: Date, default: Date.now },
  createdBy: { type: String ,required:true},
});

module.exports = mongoose.model("Recipe", recipeSchema);
