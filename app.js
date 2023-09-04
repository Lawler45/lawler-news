const express = require("express");
const cors = require('cors');

const { getTopics } = require("./controllers/topics_controller");
const { getEndpoints } = require("./controllers/api_controller");
const {
  getArticleByID,
  getArticles,
  getComments,
  patchArticle,
} = require("./controllers/articles_controller");
const {
  handle400s,
  handleCustomErrors,
} = require("./controllers/error_controllers");
const {
  postComment,
  deleteComment,
} = require("./controllers/comments_controller");
const { getUsers } = require("./controllers/users_controller");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api", getEndpoints);

app.get("/api/articles/:article_id", getArticleByID);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getComments);

app.post("/api/articles/:article_id/comments", postComment);

app.patch("/api/articles/:article_id", patchArticle);

app.delete("/api/comments/:comment_id", deleteComment);

app.get("/api/users", getUsers);

app.use((request, response) => {
  response.status(404).json({ msg: "Not Found" });
});
app.use(handle400s);

app.use(handleCustomErrors);

app.use((error, request, response, next) => {
  console.log(error, "error500");
  response.status(500).send({ msg: "internal server error" });
});
module.exports = app;
