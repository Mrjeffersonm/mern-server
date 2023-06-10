const { Recipe } = require('../models');

const RecipeData = [{
    user_id: 1,
    recipe_name: 'Plate Of Stuff',
    ingredients: 'things',
    flavor_profile: 'Sharp Metal',
    prep_time: 200,
    cook_time: 2,
    instructions: 'Smash a plate'
}];

const seedRecipe = () => Recipe.bulkCreate(RecipeData);

module.exports = seedRecipe;