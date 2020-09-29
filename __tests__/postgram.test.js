const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const userService = require('../lib/services/user-service');
const { getAgent } = require('../data/data-helpers');

describe('postgram routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));

  });
  it('creates a new post via POST', async() => {
    const response = await getAgent()
      .post('/api/v1/postgram')
      .send({});


  });


});
