const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const userService = require('../lib/services/user-service');

describe('tardygram routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));

  });
  
  it('creates a new user via POST', async() => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'email@email.com',
        password: 'hashbuds',
        profilePhotoUrl: 'www.picture.com'
      });

    expect(response.body).toEqual({
      id: expect.any(String),
      email: 'email@email.com',
      profilePhotoUrl: 'www.picture.com'
    });

  });

  it('logs in a user via POST', async() => {
    const user = await userService.create({
      email: 'email@email.com',
      password: 'hashbuds',
      profilePhotoUrl: 'www.picture.com'
    });
    
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'email@email.com',
        password: 'hashbuds',
        profilePhotoUrl: 'www.picture.com'
      });
      console.log(response.body)
    expect(response.body).toEqual({
      id: user.id,
      email: 'email@email.com',
      profilePhotoUrl: 'www.picture.com'
    });
  });

});
