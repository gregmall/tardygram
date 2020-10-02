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
      [post.userId, post.photoUrl, post.caption, post.tags]
    );
    return new Postgram(rows[0]);
  }
  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM postgram'
    );
    return rows.map(row => new Postgram(row));
  }
  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT
       postgram.id,
       postgram.photo_url,
       postgram.caption
     
       FROM postgram
       JOIN users
       ON postgram.user_id = users.id
       WHERE postgram.id=$1 `,
      [id]

    );
    if(!rows[0]) return null;
    
  }




}
module.exports = Postgram;
