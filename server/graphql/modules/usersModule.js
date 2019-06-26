const { gql } = require('apollo-server');
const bcrypt = require('bcrypt');
const config = require('../../config');
const saltRounds = config.saltRounds;
const validationSchemas = require('../../validationSchemas');

module.exports = {
  typeDefs: `
    type User {
      user_id: ID
      email: String
      is_admin: Boolean
    }

    type UserAddNotification {
      isSuccess: Boolean!
      message: String!
      is_admin: Boolean
      user_id: Int
    }

    input UserAddInput {
      email: String!
      password: String!
      passwordConfirm: String!
      is_admin: Boolean
    }

    type Query {
      GetUser(email: String): UserAddNotification
    }
    type Mutation {
      AddUser(user: UserAddInput): UserAddNotification
    }
  `,
  resolvers: {
    Query: {
      GetUser: async (_, { email }, { knex }) => {
        return { isSuccess: true, message: 'Got User' };
      }
    },
    Mutation: {
      AddUser: async (
        _,
        { user: { email, password, passwordConfirm, is_admin } },
        { knex }
      ) => {
        const { SignUpSchema } = validationSchemas;
        return SignUpSchema.validate(
          { email, password, passwordConfirm },
          { abortEarly: false }
        )
          .then(async val => {
            return await knex('users')
              .where({ email })
              .then(async res => {
                if (res.length) {
                  return {
                    isSuccess: false,
                    message: 'User already exists'
                  };
                }
                return await new Promise((resolve, reject) => {
                  bcrypt.hash(password, saltRounds, async (err, hash) => {
                    if (err) reject(err);
                    return await knex('users')
                      .insert({ email, password: hash, is_admin }, [
                        'user_id',
                        'is_admin'
                      ])
                      .then(res => {
                        const { user_id, is_admin } = res[0];
                        resolve({
                          isSuccess: true,
                          message: 'Account created successfully',
                          user_id,
                          is_admin
                        });
                      });
                  });
                })
                  .then(res => {
                    return res;
                  })
                  .catch(err => {
                    return { isSuccess: false, message: err.message };
                  });
              })
              .then(res => {
                return res;
              })
              .catch(err => {
                return { isSuccess: false, message: err.message };
              });
          })
          .then(res => {
            return res;
          })
          .catch(err => {
            return { isSuccess: false, message: err.message };
          });
      }
    }
  }
};
