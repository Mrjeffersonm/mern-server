const { User, Recipe } = require('../models');

function mapResult(result) {
    parsed = JSON.parse(JSON.stringify(result));
    console.log(parsed);

    return parsed;
}

async function userLogin(user_name, password, req) {
    const user = await User.findOne({
        attributes: ['user_name','id'],
        where: {
          user_name: user_name,
          password: password,
        },
      });
      if (!user) {
          return null
      }
      req.session.user = user;
      req.session.authenticated = true;
      return mapResult(user)
};

async function createUser(user_name, password, req) {
    const user = await User.create({user_name, password});
    return mapResult(user)
};

async function createRecipe({recipe_name, ingredients, flavor_profile, prep_time, cook_time, instructions}, req) {
    if (!req.session.authenticated) {
        return null;
    }
    const user = req.session.user.id
    const recipe = await Recipe.create({
        user_id: user,
        recipe_name,
        ingredients,
        flavor_profile,
        prep_time,
        cook_time,
        instructions
    });
    return mapResult(recipe)
};

async function alterRecipe(args, req) {
    if (!req.session.authenticated) {
        return null;
    }
    const recipe = args.id;
    const user = req.session.user.id;
    const updateValues = {...args};
    delete updateValues.id;

    await Recipe.update(updateValues, 
        {
            where: {
                user_id: user,
                id: recipe,
            }
        }
    );

    return getRecipeById(recipe)
};

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

async function getRecipeById(recipe_id) {
    const recipe = await Recipe.findAll({
        where: {
            id: recipe_id,
        }
    });
    return (mapResult(recipe[0]));
}

const resolvers = {
    Query: {
        async getAllUsers() {
            return await getUsers();
        },
        async getRecipeById(_, args, req) {
            return await getRecipeById(args.id);
        }
    },
    Mutation: {
        async login(_, args, req) {
            return await userLogin(args.user_name, args.password, req);
        },
        async addUser(_, args, req) {
            return await createUser(args.user_name, args.password, req);
        },
        async addRecipe(_, args, req) {
            return await createRecipe(args, req)
        },
        async updateRecipe(_, args, req) {
            return await alterRecipe(args, req)
        },
        async deleteRecipe(_, args, req) {
            if (!req.session.authenticated) {
                return null;
            }
            const recipe = args.id;
            const user = req.session.user.id;
            await Recipe.destroy(
                {
                    where: {
                        user_id: user,
                        id: recipe,
                    }
                }
            );
            return true;
        },
        async logout(_, args, req) {
            req.session.destroy();
            return true;
        }
    },
    User: {
        async recipes(parent) {
            return await getRecipesForUser(parent.id);
        },
    },
    Recipe: {
        async user(parent) {
            return await getUserById(parent.user_id);
        },
    },
};

module.exports = { resolvers };