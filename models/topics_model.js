const db = require("../db/connection");
const data = require("../db/data/development-data/index");

const allTopics = () => {
  return db.query(`SELECT * FROM topics;`).then(({ rows }) => {
    return rows;
  });
};

module.exports = { allTopics };
