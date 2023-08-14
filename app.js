const express = require("express");
const { getTopics } = require("./controllers/topics_controller");
const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.use((error, request, response, next) => {
  response.status(404).json({ msg: "Not Found" });
});
module.exports = app;
