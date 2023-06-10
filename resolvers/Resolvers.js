const { User, Recipe } = require('../models');

function mapResult(result) {
    parsed = JSON.parse(JSON.stringify(result));
    console.log(parsed);

    return parsed;
}

async function getUsers() {
    const users = await User.findAll({
        attributes: ['user_name', 'id'],
    });
    return mapResult(users)
};

async function getUserById (user_id) {
    const users = await User.findAll({
        where: {
            id: user_id,
        },
        attributes: ['user_name', 'id']
    });
    return mapResult(users[0]);
};

async function getRecipesForUser (user_id) {
    const recipes = await Recipe.findAll({
        where: {
            user_id: user_id,
        },
        attributes: ['id', 'user_id', 'recipe_name', 'ingredients', 'flavor_profile', 'prep_time', 'cook_time', 'instructions']
    });
    return mapResult(recipes);
};

const resolvers = {
    Query: {
        async getAllUsers() {
            return await getUsers();
        }
    },
    User: {
        async recipes(parent) {
            return await getRecipesForUser(parent.id);
        }
    },
    Recipe: {
        async user(parent) {
            return await getUserById(parent.user_id);
        }
    },
};

module.exports = { resolvers };