const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Recipe extends Model {}

Recipe.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: 'id',
            }   
        },
        recipe_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ingredients: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        flavor_profile: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        prep_time: {
            type: DataTypes.INTEGER,
        },
        cook_time: {
            type: DataTypes.INTEGER,
        },
        instructions: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        


    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'recipe',
    }
);

module.exports = Recipe;