const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');

const schema = require('./schema');
const knex = require('./knexfile');
const { PRIVATE_KEY } = require('./config');

const getUser = async token => {
  if (token) {
    try {
      return await jwt.verify(token, PRIVATE_KEY);
    } catch (error) {
      return null;
    }
  }
  return null;
};

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const token = req.headers['x-access-token'];
    const user = await getUser(token);
    return { knex, user, token };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
