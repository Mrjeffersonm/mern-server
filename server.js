const express = require('express');
const session = require('express-session');
const sequelize = require('./config/connection');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./schemas/TypeDefs');
const { resolvers } = require('./resolvers/Resolvers')

// import sequelize connection
const app = express();

async function init() {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app })
};

init()

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(session({
  secret: 'ahjgryuihlzn',
  resave: false,
  saveUninitialized: false,
  
}));

// sync sequelize models to the database, then turn on the server
const sync = async () => {
  await sequelize.sync();
};
sync();
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
