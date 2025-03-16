const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Assuming server.js exports the app
const expect = chai.expect;

chai.use(chaiHttp);

describe('API Endpoints', () => {
  it('GET /api/campaigns should return all campaigns', (done) => {
    chai.request(app)
      .get('/api/campaigns')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('GET /api/campaigns/:id should return a single campaign', (done) => {
    chai.request(app)
      .get('/api/campaigns/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('POST /api/campaigns should create a new campaign', (done) => {
    chai.request(app)
      .post('/api/campaigns')
      .send({ name: 'Test Campaign', budget: 1000 })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('id');
        done();
      });
  });
});