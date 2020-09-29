const chance = require('chance').Chance();
const UserService = require('../lib/services/user-service');
const Postgram = require('../lib/models/postgram');

module.exports = async({ userCount = 5 } = {}) => {
  const users = await Promise.all([...Array(userCount)].map((_, i) => {
    return UserService.create({
      email: `email${i}@email.com`,
      password: `hashbuds${i}`,
      profilePhotoUrl: `www.picture${i}.com`
    });
  }));

};

