// Import the express module
const express = require('express');
const path = require('path');

// Initialize the app
const app = express();

// Use JSON middleware to automatically parse JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage for ingredients
let ingredients = [];
let recipes = [];
let ingredientSeq = 0;
let recipeSeq = 0;

// Define routes
app.get('/', (req, res) => {
    res.json({message: 'Hello World'});
});

app.post('/', (req, res) => {
    console.log(req.body);
    res.json({message: 'Received'});
});

app.post('/ingredients', (req, res) => {
    // validate the request body
    const { name, unit } = req.body;
    if (!name || !unit) {
        res.status(400).json({message: 'Invalid ingredient data'});
        return;
    }

    // create new ingredient
    const id = ++ingredientSeq;
    const newIngredient = { id, name, unit };
    // store the ingredient
    ingredients.push(newIngredient);

    console.log(newIngredient);
    res.status(201).json(newIngredient);
});

app.get('/ingredients', (req, res) => {
    res.json(ingredients);
});

app.post('/recipes', (req, res) => {
    const { name, ingredientList } = req.body;
    const id = ++recipeSeq;
    const newRecipe = {id, name, ingredientList };
    console.log(newRecipe);
    if(validateIngredients(ingredientList)) {
    recipes.push(newRecipe);
	res.status(201).json(newRecipe)
    } else {
	res.status(400).json({message: 'Unknown ingredient in the recipe'});
    }
});

app.get('/recipes', (req, res) => {
    res.json(recipes);
});

function validateIngredients(ingredientList) {
    const retVal = ingredientList.every((newIngId) => ingredients.some(ing => ing.id == newIngId));
    return retVal;
}

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
