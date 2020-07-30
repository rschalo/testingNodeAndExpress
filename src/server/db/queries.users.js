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

function createUser(newUsername, newEmail) {
  return knex('users')
    .insert({
      username: newUsername,
      email: newEmail
    })
    .returning('*');
}

function updateUser(updatedUsername, updatedEmail, userID) {
  return knex('users')
    .update({
      username: updatedUsername,
      email: updatedEmail
    })
    .where({
      id: userID
    })
    .returning('*');
}

function deleteUser(userID) {
  return knex('users')
    .del()
    .where({
      id: userID
    })
    .returning('*');
}

module.exports = {
  getAllUsers,
  getAUser,
  createUser,
  updateUser,
  deleteUser
};
