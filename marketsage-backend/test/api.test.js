const request = require('supertest');
const app = require('../server');

describe('API Endpoints', () => {
  it('GET /api/campaigns should return all campaigns', async () => {
    const res = await request(app).get('/api/campaigns');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('GET /api/campaigns/:id should return a single campaign', async () => {
    const res = await request(app).get('/api/campaigns/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', 1);
  });

  it('POST /api/campaigns should create a new campaign', async () => {
    const newCampaign = { name: 'Test Campaign', platform: 'SMS', reach: 10000 };
    const res = await request(app).post('/api/campaigns').send(newCampaign);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'Test Campaign');
  });
});