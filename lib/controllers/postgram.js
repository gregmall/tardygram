const { Router } = require('express');
const UserService = require('../services/user-service');
const ensureAuth = require('../middleware/ensure-auth');
const Postgram = require('../models/postgram');


module.exports = Router()
  .post('/posts', ensureAuth, (res, req, next) => {
    Postgram  
      .insert({ ...req.body, userId: req.user.id })
      .then(post => res.send(post))
      .catch(next);
  });

