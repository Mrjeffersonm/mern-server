const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID
        user_name: String
        recipes: [Recipe!]!
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
        getAllUsers: [User!]!
        
    }

    # Mutations
`

module.exports = { typeDefs }