// setting Node Environment to test
process.env.NODE_ENV = 'test';

// required packages
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

// including routing from app and db
const server = require('../../src/server/app');
const knex = require('../../src/server/db/knex');

// rolls back schema creation done by migration,
// then re-runs the migration and seeds the newly created table

describe('routes : users', () => {
  beforeEach((done) => {
    knex.migrate.rollback().then(() => {
      knex.migrate.latest().then(() => {
        knex.seed.run().then(() => {
          done();
        });
      });
    });
  });

  describe('GET /api/v1/users', () => {
    it('should respond with all users', (done) => {
      chai
        .request(server)
        .get('/api/v1/users')
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          // the JSON response body should have a
          // key-value pair of {"data": [2 user objects]}
          res.body.data.length.should.eql(2);
          // the first object in the data array should
          // have the right keys
          res.body.data[0].should.include.keys(
            'id',
            'username',
            'email',
            'created_at'
          );
          done();
        });
    });
  });
  describe('GET /api/v1/users/:id', () => {
    it('should respond with a single user', (done) => {
      chai
        .request(server)
        .get('/api/v1/users/1')
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          // the JSON response body should have a
          // key-value pair of {"data": 1 user object}
          res.body.data[0].should.include.keys(
            'id',
            'username',
            'email',
            'created_at'
          );
          done();
        });
    });
  });
  describe('POST /api/v1/users', () => {
    it('should respond with a success message along with a single user that was added', (done) => {
      chai
        .request(server)
        .post('/api/v1/users')
        .send({
          username: 'ryan',
          email: 'ryan@ryan.com'
        })
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 201 status code
          // (indicating that something was "created")
          res.status.should.equal(201);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          // the JSON response body should have a
          // key-value pair of {"data": 1 user object}
          res.body.data[0].should.include.keys(
            'id',
            'username',
            'email',
            'created_at'
          );
          done();
        });
    });
  });
  describe('PUT /api/v1/users', () => {
    it('should respond with a success message along with a single user that was updated', (done) => {
      knex('users')
        .select('*')
        .then((user) => {
          const userObject = user[0];
          chai
            .request(server)
            .put(`/api/v1/users/${userObject.id}`)
            .send({
              username: 'updatedUser',
              email: 'updated@user.com'
            })
            .end((err, res) => {
              // there should be no errors
              should.not.exist(err);
              // there should be a 200 status code
              res.status.should.equal(200);
              // the response should be JSON
              res.type.should.equal('application/json');
              // the JSON response body should have a
              // key-value pair of {"status": "success"}
              res.body.status.should.eql('success');
              // the JSON response body should have a
              // key-value pair of {"data": 1 user object}
              res.body.data[0].should.include.keys(
                'id',
                'username',
                'email',
                'created_at'
              );
              // ensure the user was in fact updated
              var newUserObject = res.body.data[0];
              newUserObject.username.should.not.eql(userObject.username);
              newUserObject.email.should.not.eql(userObject.email);
              // redundant
              newUserObject.username.should.eql('updatedUser');
              newUserObject.email.should.eql('updated@user.com');
              done();
            });
        });
    });
  });

  afterEach((done) => {
    knex.migrate.rollback().then(() => {
      done();
    });
  });
});
