const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID
        user_name: String
        recipes: [Recipe!]
    }
    type Recipe {
        id: ID!
        user: User!
        recipe_name: String!
        ingredients: String!
        flavor_profile: String!
        prep_time: Int
        cook_time: Int
        instructions: String!
    }

    # Queries
    type Query {
        getAllUsers: [User!]
        getRecipeById(id: ID!): Recipe 
    }

    # Mutations
    type Mutation {
        login(user_name: String!, password: String!): User
        logout: Boolean!
        addUser(user_name: String!, password: String!): User
        addRecipe(recipe_name: String!, ingredients: String!,
        flavor_profile: String!, prep_time: Int, cook_time: Int, instructions: String!): Recipe
        updateRecipe(id: ID!, recipe_name: String, ingredients: String,
        flavor_profile: String, prep_time: Int, cook_time: Int, instructions: String): Recipe
        deleteRecipe(id: ID!): Boolean!
    }
`
module.exports = { typeDefs }