const { ApolloServer, AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

const schema = require('./schema');
const knex = require('./knexfile');
const { PRIVATE_KEY } = require('./config');

const getUser = async token => {
  if (token) {
    try {
      return await jwt.verify(token, PRIVATE_KEY);
    } catch (error) {
      return {
        user_id: null,
        is_admin: null
      };
    }
  }
  return {
    user_id: null,
    is_admin: null
  };
};

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const token = req.headers['x-access-token'];
    const user = await getUser(token);
    const { user_id, is_admin } = user;
    return { knex, user_id, is_admin };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
