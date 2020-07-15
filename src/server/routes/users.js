const express = require('express');
const router = express.Router();

const knex = require('../db/knex');

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
      res
        .status(200)
        .json({
          status: 'success',
          data: user
        })
        .catch((err) => {
          res.status(500).json({
            status: 'error',
            data: err
          });
        });
    });
});

router.post('/', (req, res, next) => {
  const { username, email } = req.params;
  knex('users')
    .insert({
      username: username,
      email: email
    })
    .returning('*')
    .then((user) => {
      res
        .status(201)
        .json({
          status: 'success',
          data: user
        })
        .catch((err) => {
          res.status(500).json({
            status: 'error',
            data: err
          });
        });
    });
});
