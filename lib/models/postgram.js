const pool = require('../utils/pool');

class Postgram {
  id;
  userId;
  photoUrl;
  caption;
  tags;

  constructor(row) {
    this.id =  row.id;
    this.userId = row.user_id;
    this.photoUrl = row.photo_url;
    this.caption = row.caption;
    this.tags = row.tags;

  }


  

  toJSON(){
    return {
      id: this.id,
      email: this.email,
      profilePhotoUrl: this.profilePhotoUrl
    };
  }
}
module.exports = Postgram;
