const pool = require('../utils/pool');

class Comment {
  id;
  commentBy;
  postId;
  comment;

  constructor(row) {
    this.id = row.id;
    this.commentBy = row.comment_by;
    this.postId = row.post_id;
    this.comment = row.comment;

  }

}

module.exports = Comment;

