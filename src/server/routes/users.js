const express = require('express');
const router = express.Router();

const knex = require('../db/knex');
const { filterByYear } = require('../controllers/users');

module.exports = router;

router.get('/', (req, res, next) => {
  knex('users')
    .select('*')
    .then((users) => {
      res.status(200).json({
        status: 'success',
        data: users
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'error',
        data: err
      });
    });
});

router.get('/:id', (req, res, next) => {
  knex('users')
    .where({ id: req.params.id })
    .then((user) => {
      res.status(200).json({
        status: 'success',
        data: user
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'error',
        data: err
      });
    });
});

router.get('/:year', (req, res, next) => {
  const filteringYear = req.params.year;
  knex('users')
    .select('*')
    .then((users) => {
      const filteredUsers = filterByYear(users, filteringYear);
      console.log(filteredUsers);
      res.status(200).json({
        status: 'success',
        data: filteredUsers
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'error',
        data: err
      });
    });
});

router.post('/', (req, res, next) => {
  const newUsername = req.body.username;
  const newEmail = req.body.email;
  knex('users')
    .insert({
      username: newUsername,
      email: newEmail
    })
    .returning('*')
    .then((user) => {
      res.status(201).json({
        status: 'success',
        data: user
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'error',
        data: err
      });
    });
});

router.put('/:id', (req, res, next) => {
  const userID = parseInt(req.params.id);
  const updatedUsername = req.body.username;
  const updatedEmail = req.body.email;
  knex('users')
    .update({
      username: updatedUsername,
      email: updatedEmail
    })
    .where({
      id: userID
    })
    .returning('*')
    .then((user) => {
      res.status(200).json({
        status: 'success',
        data: user
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'error',
        data: err
      });
    });
});
router.delete('/:id', (req, res, next) => {
  const userID = parseInt(req.params.id);
  knex('users')
    .del()
    .where({
      id: userID
    })
    .returning('*')
    .then((user) => {
      res.status(200).json({
        status: 'success',
        data: user
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'error',
        data: err
      });
    });
});
