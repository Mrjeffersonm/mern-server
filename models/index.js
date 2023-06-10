const User = require('./User');
const Recipe = require('./Recipe')

User.hasMany(Recipe);

Recipe.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = {
  User,
  Recipe,
};
