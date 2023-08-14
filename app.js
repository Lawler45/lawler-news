const express = require("express");
const { getTopics} = require("./controllers/topics_controller");
const {getEndpoints} = require('./controllers/api_controller')
const app = express();

app.get("/api/topics", getTopics);

app.get("/api", getEndpoints);

app.use((error, request, response, next) => {
  response.status(404).json({ msg: "Not Found" });
});
module.exports = app;
