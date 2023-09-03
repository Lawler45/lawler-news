const db = require("../db/connection");
const data = require("../db/data/development-data/index");

const allTopics = () => {
  return db.query(`SELECT * FROM topics;`).then(({ rows }) => {
    return rows;
  });
};

const checkTopicExists = (topic) => {
  return db
    .query(
      `SELECT * FROM topics
      WHERE slug = $1`,
      [topic]
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    });
};

module.exports = { allTopics, checkTopicExists };
