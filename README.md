# Northcoders News API

Welcome to my repo! To get started you will need to set up a development enviroment as well as a test enviroment. For instructions on how to do this please go check out https://www.freecodecamp.org/news/how-to-set-an-environment-variable-in-linux/.



const allArticles = (sort_by = "created_at", order = "DESC") => {
  console.log(sort_by, "sort");
  const acceptedArticles = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
    "article_img_url",
    "comment_count",
  ];
  if (!acceptedArticles.includes(sort_by)) {
    console.log("in the first if state");
    return Promise.reject({ status: 400, msg: "bad request" });
  }

  if (!acceptedArticles.includes(order)) {
    console.log("in the second if state");

    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  let baseSqlString = `SELECT * FROM articles`;
  baseSqlString += `ORDER BY ${sort_by} ${order};
  `;

  return db.query(baseSqlString).then(({ rows }) => {
    return rows;
  });
};
