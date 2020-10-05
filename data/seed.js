const chance = require('chance').Chance();
const UserService = require('../lib/services/user-service');
const Postgram = require('../lib/models/post');
const Comment = require('../lib/models/comment');


module.exports = async({ userCount = 5, postCount = 50, commentCount = 100 } = {}) => {
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
  
  await Promise.all([...Array(commentCount)].map(() => {
    return Comment.insert({
      commentBy: chance.pickone(users).id,
      postId: chance.pickone(posts).id,
      comment: chance.sentence()
    });
  }));

};

