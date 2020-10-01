const chance = require('chance').Chance();
const UserService = require('../lib/services/user-service');
const Postgram = require('../lib/models/post');


module.exports = async({ userCount = 5, postCount = 100 } = {}) => {
  const users = await Promise.all([...Array(userCount)].map((_, i) => {
    return UserService.create({
      email: `email${i}@email.com`,
      password: `hashbuds${i}`,
      profilePhotoUrl: `www.picture${i}.com`
    });
  }));

  await Promise.all([...Array(postCount)].map(() => {
    return Postgram.insert({
      photoUrl: chance.url(),
      caption: chance.sentence(),
      tags: [chance.hashtag()],
      userId: chance.pickone(users).id
    });
  }));       

};

