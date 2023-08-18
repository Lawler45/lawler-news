const db = require("../db/connection");
const data = require("../db/data/development-data/index");

const createComment = (article_id, username, body) => {
  if (typeof username !== "string") {
    return Promise.reject({ status: 404, msg: "Not Found" });
  }
  return db
    .query(
      `INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;`,
      [article_id, username, body]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

const removeComment = (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, [
      comment_id,
    ])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "Comment doesnt exist" });
      }
    });
};
module.exports = { createComment, removeComment };
