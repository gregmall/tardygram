const pool = require('../utils/pool');
const Comment = require('./comment');

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
  static async findById(postId) {
    const { rows } = await pool.query(
      `SELECT
        users.email, posts.*, array_to_json(array_agg(comments.*)) AS comments
       FROM postgram
       JOIN users
       ON postgram.user_id = users.id
       JOIN comments ON posts.id = comments.post_id
       WHERE postgram.id=$1 
       GROUP BY users.email, postgram.id `,
      [postId]

    );
    return {
      ...new Postgram(rows[0]),
      user: rows[0].email,
      comments: rows[0].comments.map(comment => new Comment(comment))
    };
    
  }




}
module.exports = Postgram;
