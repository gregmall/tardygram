const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const userService = require('../lib/services/user-service');
const { getAgent } = require('../data/data-helpers');
const Postgram = require('../lib/models/post');

describe('postgram routes', () => {

  it('creates a new post via POST', async() => {
    const response = await getAgent()
      .post('/api/v1/posts')
      .send({
      
        photoUrl: 'www.photo.com',
        caption: 'this is my photo',
        tags: ['picture', 'fun', 'family']

      });
    
    expect(response.body).toEqual({
      id: expect.any(String),
      userId : expect.any(String),
      photoUrl: 'www.photo.com',
      caption: 'this is my photo',
      tags: ['picture', 'fun', 'family']
      
    });
  });

  it('gets all posts with GET', async() => {
    const posts = await Postgram.find();
    const response = await request(app)
      .get('/api/v1/posts');
    expect(response.body).toEqual(expect.arrayContaining(posts));
   

  });

  it('finds a post by id with GET', async() => {
    const post = await Postgram.findById(1);
    const response = await request(app)
      .get('/api/v1/posts/1');
      console.log(response.body)

    expect(response.body).toEqual({
      
        
    });

  });


});
