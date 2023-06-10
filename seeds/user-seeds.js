const { User } = require('../models');

const userData = [{
    user_name: 'Test',
    password: 'password',
}];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
