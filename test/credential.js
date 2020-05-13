// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// let mongoose = require("mongoose");
// let Credential = require('../app/models/book');

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);
describe('Books', () => {
  /*
   * Test the /GET route
   */
  describe('/GET credential', () => {
    it('should generate and return new credential', (done) => {
      chai.request(server)
        .get('/credential')
        .end((err, res) => {
          should.exist(res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.be.eql({
            credential: 'smth',
            user: 'turlu',
          });
          done();
        });
    });
  });

});
