const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const userService = require('../lib/services/user-service');
const { getAgent } = require('../data/data-helpers');

describe('postgram routes', () => {
  // beforeEach(() => {
  //   return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));

  // });
  it('creates a new post via POST', async() => {
    const response = await getAgent()
      .post('/api/v1/posts')
      .send({
      
        photoUrl: 'www.photo.com',
        caption: 'this is my photo',
        tags: ['picture', 'fun', 'family']

      });
    console.log(response.body);
    expect(response.body).toEqual({
      id: expect.any(String),
      userId : expect.any(String),
      photoUrl: 'www.photo.com',
      caption: 'this is my photo',
      tags: ['picture', 'fun', 'family']
      
    });


  });


});
