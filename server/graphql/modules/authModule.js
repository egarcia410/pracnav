const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const saltRounds = config.saltRounds;
const { SignInSchema, SignUpSchema } = require('../../validationSchemas/auth');

module.exports = {
  typeDefs: `
    type AuthNotification {
      isSuccess: Boolean!
      message: String!
      is_admin: Boolean
      user_id: Int
      email: String
      token: String
    }

    input SignUpInput {
      email: String!
      password: String!
      passwordConfirm: String!
      is_admin: Boolean
    }

    type Query {
      AuthSignIn(email: String!, password: String!): AuthNotification
    }
    type Mutation {
      AuthSignUp(user: SignUpInput): AuthNotification
    }
  `,
  resolvers: {
    Query: {
      AuthSignIn: async (_, { email, password }, { knex }) => {
        return SignInSchema.validate(
          { email, password },
          { abortEarly: false }
        ).then(async () => {
          return await knex('users')
            .where({ email })
            .then(async user => {
              if (user.length) {
                const hashedPassword = user[0].password;
                bcrypt.compare(password, hashedPassword, (err, res) => {
                  if (err) {
                    return {
                      isSuccess: false,
                      message: err.message
                    };
                  }
                  const { user_id, email, is_admin } = user[0];
                  jwt.sign(
                    {
                      email,
                      is_admin,
                      user_id
                    },
                    config.PRIVATE_KEY,
                    { expiresIn: '1h' },
                    (err, token) => {
                      if (err) {
                        return {
                          isSuccess: false,
                          message: err.message
                        };
                      }
                      return {
                        user_id,
                        email,
                        is_admin,
                        token,
                        isSuccess: true,
                        message: 'Welcome Back!'
                      };
                    }
                  );
                });
              } else {
                return {
                  isSuccess: false,
                  message: 'Email/Password Invalid'
                };
              }
            })
            .then(res => {
              return res;
            })
            .catch(err => {
              return {
                isSuccess: false,
                message: err.message
              };
            });
        });
      }
    },
    Mutation: {
      AuthSignUp: async (
        _,
        { user: { email, password, passwordConfirm, is_admin } },
        { knex }
      ) => {
        return SignUpSchema.validate(
          { email, password, passwordConfirm },
          { abortEarly: false }
        )
          .then(async () => {
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
