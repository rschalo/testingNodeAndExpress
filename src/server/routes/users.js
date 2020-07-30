const express = require('express');
const router = express.Router();
const validate = require('./validation');
const knex = require('../db/knex');
const { filterByYear } = require('../controllers/users');
const {
  getAllUsers,
  getAUser,
  createUser,
  updateUser,
  deleteUser
} = require('../db/queries.users');

module.exports = router;

router.get('/', (req, res, next) => {
  getAllUsers((err, users) => {
    if (err) {
      res.status(500).json({
        status: 'error',
        data: err
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: users
      });
    }
  });
});

router.get('/:id', validate.validateUserResources, (req, res, next) => {
  const { id } = req.params;
  getAUser(id, (err, user) => {
    if (err) {
      res.status(500).json({
        status: 'error',
        data: err
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: user
      });
    }
  });
});

router.get('/:year', validate.validateUserResources, (req, res, next) => {
  const filteringYear = req.params.year;
  getAllUsers((err, users) => {
    if (err) {
      res.status(500).json({
        status: 'error',
        data: err
      });
    } else {
      const filteredUsers = filterByYear(users, filteringYear);
      res.status(200).json({
        status: 'success',
        data: filteredUsers
      });
    }
  });
});

router.post('/', validate.validateUserResources, (req, res, next) => {
  const newUsername = req.body.username;
  const newEmail = req.body.email;
  try {
    createUser(newUsername, newEmail).then((user) => {
      res.status(201).json({
        status: 'success',
        data: user
      });
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      data: err
    });
  }
});

router.put('/:id', validate.validateUserResources, (req, res, next) => {
  const userID = parseInt(req.params.id);
  const updatedUsername = req.body.username;
  const updatedEmail = req.body.email;
  try {
    updateUser(updatedUsername, updatedEmail, userID).then((user) => {
      res.status(200).json({
        status: 'success',
        data: user
      });
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      data: err
    });
  }
});

router.delete('/:id', validate.validateUserResources, (req, res, next) => {
  const userID = parseInt(req.params.id);
  try {
    deleteUser(userID).then((user) => {
      res.status(200).json({
        status: 'success',
        data: user
      });
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      data: err
    });
  }
});
