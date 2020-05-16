// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const should = chai.should();

chai.use(chaiHttp);

// TODO: that's not a unit test

describe('Data endpoint', () => {
  describe('/GET data/:id', () => {
    it('found data for id=test', (done) => {
      chai
        .request(app)
        .get('/api/v1/data/test')
        .end((err, res) => {
          should.exist(res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.be.eql({
            data: 'test_value',
            id: 'test',
          });
          done();
        });
    });
    it('found nothing for id=undef', (done) => {
      chai
        .request(app)
        .get('/api/v1/data/undef')
        .end((err, res) => {
          should.exist(res.body);
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.be.eql({
            error: 'no data for id undef',
          });
          done();
        });
    });
  });

  describe('/GET data', () => {
    it('should return all dataset', (done) => {
      chai
        .request(app)
        .get('/api/v1/data')
        .end((err, res) => {
          should.exist(res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.be.eql({
            test: {
              data: 'test_value',
              id: 'test',
            },
          });
          done();
        });
    });
  });

  describe('/DELETE data/:id', () => {
    it('should delete dataset for id=test', (done) => {
      chai
        .request(app)
        .delete('/api/v1/data/test')
        .end((err, res) => {
          should.exist(res.body);
          res.should.have.status(204);
          res.body.should.be.a('object');
          res.body.should.be.eql({});
          done();
        });
    });

    it('should found nothing for id=undef', (done) => {
      chai
        .request(app)
        .delete('/api/v1/data/undef')
        .end((err, res) => {
          should.exist(res.body);
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.be.eql({
            error: 'no data for id undef',
          });
          done();
        });
    });
  });
});

describe('Global', () => {
  describe('Errors', () => {
    it('404 should be json', (done) => {
      chai
        .request(app)
        .get('/api')
        .end((err, res) => {
          should.exist(res.body);
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.be.eql({
            error: 'Not Found',
          });
          done();
        });
    });
  });
});
