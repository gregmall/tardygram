const { Router, response } = require('express');
const UserService = require('../services/user-service');

const ONE_DAY = 1000 * 60 * 60 * 24;
const attachCookie = (user, res) => {
  const token = UserService.makeToken(user);
  res.cookie('session', token, {
    maxAge: ONE_DAY,
    httpOnly: true,
    sameSite: 'none'
  });
};


module.exports = Router()
  .post('/signup', (req, res, next) => {
    UserService
      .create(req.body)
      .then(user => {
        attachCookie(user, res);
        res.send(user);
      })
      .catch(next);
      
  })
  .post('/login', (req, res, next) => {
    UserService
      .authorize(req.body)
      .then(user => {
        attachCookie(user, res);
        res.send(user);
      })
      .catch(next);
  });
