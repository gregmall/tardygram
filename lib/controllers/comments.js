const { Router } = require('express');
const UserService = require('../services/user-service');
const ensureAuth = require('../middleware/ensure-auth');
const Comment = require('../models/post');

module.exports = Router() 
  .post('/', ensureAuth, (req, res, next) => {
    Comment
      .insert({ ...req.body, userId: req.user.id })
      .then(comment => res.send(comment))
      .catch(next);
  });
  