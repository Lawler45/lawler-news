const express = require("express");
const { getTopics} = require("./controllers/topics_controller");
const {getEndpoints} = require('./controllers/api_controller')
const {getArticleByID, getArticles, getComments} = require('./controllers/articles_controller')
const {handle400s, handleCustomErrors} = require('./controllers/error_controllers')
const app = express();

app.get("/api/topics", getTopics);

app.get("/api", getEndpoints);

app.get('/api/articles/:article_id', getArticleByID)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id/comments', getComments)

app.use((request, response) => {
  response.status(404).json({ msg: "Not Found" });
});
app.use(handle400s);

app.use(handleCustomErrors)
module.exports = app;
