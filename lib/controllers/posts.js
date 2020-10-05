const { Router } = require('express');
const UserService = require('../services/user-service');
const ensureAuth = require('../middleware/ensure-auth');
const Postgram = require('../models/post');


module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Postgram  
      .insert({ ...req.body, userId: req.user.id })
      .then(post => res.send(post))
      .catch(next);
      
  })
  .get('/', (req, res, next) => {
    Postgram
      .find()
      .then(posts => res.send(posts))
      .catch(next);
  });

