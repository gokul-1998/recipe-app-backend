const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const recipeSchema = require("./models/recipe.schema");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// MongoDB Connection String

mongoose.connect(
  `mongodb+srv://21f1007026:${process.env.MONGODB_URI_PASSWORD}@cluster0.89v8kpt.mongodb.net/?retryWrites=true&w=majority`
);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Initial Route
app.get("/", (req, res) => {
  return res.status(200).send("Welcome Home");
});

// Create Recipe
app.post("/recipe", async (req, res) => {
  console.log(req.body);
  try {
    const {
      name,
      thumbnail,
      images,
      description,
      ingredients,
      instructions,
      nutritionalValues,
      difficulty,
      prepTime,
      createdBy,
    } = req.body;
    const data = await recipeSchema.create({
      name,
      thumbnail,
      images,
      description,
      ingredients,
      instructions,
      nutritionalValues,
      difficulty,
      prepTime,
      createdBy,
    });
    data.save();
    return res.status(200).send("Recipe Saved Successfully");
  } catch (error) {
    res.status(501).send(error);
  }
});

// get all recipes
app.get("/recipes", async (req, res) => {
  try {
    const data = await recipeSchema.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(501).send(error);
  }
}
);


// get recipies by name case insensitive, partial match, and return all matching recipes
app.get("/recipe/:name", async (req, res) => {
  try {
    const data = await recipeSchema.find({ name: { $regex: req.params.name, $options: "i" } });
    res.status(200).send(data);
  } catch (error) {
    res.status(501).send(error);
  }
}
);


// delete recipe by id
app.delete("/recipe/:id", async (req, res) => {
  try {
    const data = await recipeSchema.findByIdAndDelete(req.params._id);
    res.status(200).send(data);
  } catch (error) {
    res.status(501
    ).send
    (error);
  }
}
);


// get recipe by id
app.get("/recipe/id/:id", async (req, res) => {
  try {
    const data = await recipeSchema.findById(req.params.id);
    res.status(200).send(data);
  } catch (error) {
    res.status(501).send(error);
  }
}
);
