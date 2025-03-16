const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('API Endpoints', () => {
  let server;

  before((done) => {
    server = app.listen(0, done); // Start server on random port
  });

  after((done) => {
    server.close(done); // Close server after tests
  });

  it('GET /api/campaigns should return all campaigns', (done) => {
    chai.request(app)
      .get('/api/campaigns')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(3);
        done();
      });
  });

  it('GET /api/campaigns/:id should return a single campaign', (done) => {
    chai.request(app)
      .get('/api/campaigns/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.equal(1);
        done();
      });
  });

  it('POST /api/campaigns should create a new campaign', (done) => {
    chai.request(app)
      .post('/api/campaigns')
      .send({ name: 'Test Campaign', platform: 'Email', reach: 5000 })
      .timeout(5000) // Increase to 5 seconds
      .end((err, res) => {
        console.log('POST Response:', err, res.status, res.body); // Debug output
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('id');
        expect(res.body.name).to.equal('Test Campaign');
        done();
      });
  });
});