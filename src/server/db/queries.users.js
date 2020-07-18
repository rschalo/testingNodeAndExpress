const knex = require('./knex');

function getAllUsers(callback) {
  return knex('users')
    .select('*')
    .then((users) => {
      callback(null, users);
    })
    .catch((err) => {
      callback(err);
    });
}

function getAUser(userID, callback) {
  return knex('users')
    .select('*')
    .where({ id: userID })
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    });
}

module.exports = {
  getAllUsers,
  getAUser
};
