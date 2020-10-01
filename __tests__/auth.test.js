const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const userService = require('../lib/services/user-service');
require('../data/data-helpers');

describe('auth routes', () => {
  
  
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
    
    expect(response.body).toEqual({
      id: user.id,
      email: 'email@email.com',
      profilePhotoUrl: 'www.picture.com'
    });
  });

  it('verifies a user using GET', async() => {
    const agent = request.agent(app);
    await agent
      .post('/api/v1/auth/signup')
      .send({
        email: 'email@email.com',
        password: 'hashbuds',
        profilePhotoUrl: 'www.picture.com'
      });

    const response = await agent
      .get('/api/v1/auth/verify');
    
    expect(response.body).toEqual({
      id: expect.any(String),
      email: 'email@email.com',
      profilePhotoUrl: 'www.picture.com'
    });

    const responseWithoutAUser = await request(app)
      .get('/api/v1/auth/verify');

    expect(responseWithoutAUser.body).toEqual({
      status: 401,
      message: 'jwt must be provided'
    });
      
  });

});
