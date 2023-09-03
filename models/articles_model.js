const db = require("../db/connection");
const data = require("../db/data/development-data/index");

const articleId = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id=$1`, [article_id])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      return rows[0];
    });
};

const allArticles = (topic, sort_by = "created_at", order = "desc") => {

  const tableHeaders = [
    "article_id",
    "author",
    "created_at",
    "votes",
    "article_img_url",
  ];

  if (!tableHeaders.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  if (order !== "desc" && order !== "asc") {
    console.log("inside order by");
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  const queryValues = [];

  let baseSqlStringOne = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id)::integer AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id `;

  if (topic) {
    baseSqlStringOne += `WHERE articles.topic = $1 `;
    queryValues.push(topic);
  }

  baseSqlStringOne += `GROUP BY articles.article_id `;

  if (sort_by) {
    baseSqlStringOne += `ORDER BY articles.${sort_by} `;
  }

  if (order) {
    baseSqlStringOne += `${order}`;
  }

  return db.query(baseSqlStringOne, queryValues).then((result) => {
    return result.rows;
  });
};

const allComments = (article_id) => {
  return db
    .query(
      `SELECT * FROM comments
    WHERE article_id=$1
    ORDER BY created_at DESC`,
      [article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

const patchArticleVotes = (article_id, inc_votes) => {
  if (inc_votes === undefined) {
    return db
      .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({ status: 404, msg: "Article Not Found" });
        }
        return rows[0];
      });
  } else {
    return db
      .query(
        `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`,
        [inc_votes, article_id]
      )
      .then(({ rows }) => {
        return rows[0];
      });
  }
};

module.exports = { articleId, allArticles, allComments, patchArticleVotes };
