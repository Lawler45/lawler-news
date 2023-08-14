const db = require("../db/connection");
const data = require("../db/data/development-data/index");

const allTopics = (order_by = "slug") => {
  const acceptedTopics = ["description", "slug"];
  let baseSqlString = `SELECT * FROM topics;`;

  return db.query(baseSqlString).then(({ rows }) => {
    return rows;
  });
};

module.exports = { allTopics };
