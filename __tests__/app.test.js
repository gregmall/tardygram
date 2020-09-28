const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('tardygram routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));

  });
  
  it('creates a new user via POST', async() => {
    const response = await request(app)
      .post('api/v1/auth/signup')
      .send({
        email: 'email@email.com',
        password_hash: 'hashbuds',
        profile_photo_url: 'www.picture.com'
      });

    expect(response.body).toEqual({
      id: expect.any(String),
      email: 'email@email.com',
      profile_photo_url: 'www.picture.com'
    });


  

  });

});
