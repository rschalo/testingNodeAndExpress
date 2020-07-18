const express = require('express');
const router = express.Router();
const validate = require('./validation');
const knex = require('../db/knex');
const { filterByYear } = require('../controllers/users');
const queriesUsers = require('../db/queries.users');

module.exports = router;

router.get('/', (req, res, next) => {
  queriesUsers.getAllUsers((err, users) => {
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
  queriesUsers.getAUser(id, (err, user) => {
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

//   knex('users')
//     .where({ id: req.params.id })
//     .then((user) =>
//       res
//         .status(200)
//         .json({
//           status: 'success',
//           data: user
//         })
//         .catch((err) => {
//           res.status(500).json({
//             status: 'error',
//             data: err
//           });
//         })
//     );
// });

router.get('/:year', validate.validateUserResources, (req, res, next) => {
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

router.post('/', validate.validateUserResources, (req, res, next) => {
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

router.put('/:id', validate.validateUserResources, (req, res, next) => {
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
router.delete('/:id', validate.validateUserResources, (req, res, next) => {
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
