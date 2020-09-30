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
  static async insert(post) {
    const { rows } = await pool.query(
      `INSERT INTO postgram (user_id, photo_url, caption, tags)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [post.user_id, post.photo_url, post.caption, post.tags]
    );
    return new Postgram(rows[0]);
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
