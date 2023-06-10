const express = require('express');
const session = require('express-session');
const sequelize = require('./config/connection');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./schemas/TypeDefs');
const { resolvers } = require('./resolvers/Resolvers')
const cors = require('cors');

// import sequelize connection
const app = express();

async function init() {
    const server = new ApolloServer({ typeDefs, resolvers, 
    context: async (context) => {
      // console.log("Session:", context.req.session)
      return { 
        session: context.req.session,
      };
    }
  });
  
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
  cookie: {
    maxAge: 1000 * 60 * 60 * 2,
    sameSite: true,
    secure: false // in development 
  }
}));
app.use(cors())

// sync sequelize models to the database, then turn on the server
const sync = async () => {
  await sequelize.sync();
};
sync();
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
