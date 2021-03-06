const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const saltRounds = config.saltRounds;
const { SignInSchema, SignUpSchema } = require('../../validationSchemas/auth');

module.exports = {
  AuthQuery: {
    IsAuthenticated: async (_, __, { knex, user }) => {
      if (user) {
        return { ...user, isLoggedIn: true };
      }
      return null;
    },
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
              const match = await bcrypt.compare(password, hashedPassword);
              if (match) {
                const { user_id, email, is_admin } = user[0];
                const token = await jwt.sign(
                  {
                    email,
                    is_admin,
                    user_id,
                    department_id: 1
                  },
                  config.PRIVATE_KEY,
                  { expiresIn: '1h' }
                );
                if (token) {
                  return {
                    user_id,
                    email,
                    is_admin,
                    department_id: 1,
                    token,
                    isSuccess: true,
                    message: 'Welcome Back!'
                  };
                }
                return {
                  isSuccess: false,
                  message: 'Unable to issue token'
                };
              }
              return {
                isSuccess: false,
                message: 'Email/Password Invalid'
              };
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
  AuthMutation: {
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
                      'is_admin',
                      'email'
                    ])
                    .then(async user => {
                      const { user_id, is_admin, email } = user[0];
                      const token = await jwt.sign(
                        {
                          email,
                          is_admin,
                          user_id,
                          department_id: 1
                        },
                        config.PRIVATE_KEY,
                        { expiresIn: '1h' }
                      );
                      if (token) {
                        resolve({
                          user_id,
                          email,
                          is_admin,
                          token,
                          department_id: 1,
                          isSuccess: true,
                          message: 'Account created successfully'
                        });
                      }
                      resolve({
                        isSuccess: false,
                        message: 'Unable to issue token'
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
};
