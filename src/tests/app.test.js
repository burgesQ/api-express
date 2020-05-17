// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
const should = chai.should();

const testPaylod = {
  id: 'test',
  some_int: 1,
  some_string: 'some content',
};

describe('Data endpoint', () => {


  afterEach(() => {
    client = require('../modules/redis.mock.js').mockRedis.initData();
  });

  describe('/GET data/:id', () => {
    it('found data for id=test', (done) => {
      chai
        .request(app)
        .get('/api/v1/data/test')
        .end((err, res) => {
          should.exist(res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.be.eql(testPaylod);
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
          res.body.should.be.a('array');
          res.body.should.be.eql([testPaylod]);
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

    it('should act normal when id=undef', (done) => {
      chai
        .request(app)
        .delete('/api/v1/data/undef')
        .end((err, res) => {
          should.exist(res.body);
          res.should.have.status(204);
          res.body.should.be.a('object');
          res.body.should.be.eql({});
          done();
        });
    });

    it('should remove only the selected fields', (done) => {
      chai
        .request(app)
        .delete('/api/v1/data/test?fields=some_string')
        .end((err, res) => {
          should.exist(res.body);
          res.should.have.status(204);
          res.body.should.be.a('object');
          res.body.should.be.eql({});

          chai
            .request(app)
            .get('/api/v1/data/test')
            .end((err, res) => {
              should.exist(res.body);
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.be.eql({
                id: 'test',
                some_int: 1,
              });
              done();
            });
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
          res.body.should.be.eql({ error: 'Not Found' });
          done();
        });
    });
  });
});
