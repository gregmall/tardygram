const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const create = async({ email, password, profilePhotoUrl }) => {
  const passwordHash = await bcrypt.hash(password, 14);
  
  return User.insert({ email, passwordHash, profilePhotoUrl });
};

const makeToken = user => {
  const token = jwt.sign(user.toJSON(), process.env.APP_SECRET, {
    expiresIn: '2d'
  });
  return token;
};

const authorize = async({ email, password, profilePhotoUrl }) => {
  const user = await User.findByEmail(email);
  if(!user) throw new Error('Invalid email and/or password');

  const matchingPassword = await bcrypt.compare(password, user.passwordHash);
  if(!matchingPassword) throw new Error('Invalid email and/or password');
  console.log(user)
  return user;

};

module.exports = {
  create,
  makeToken,
  authorize
};
