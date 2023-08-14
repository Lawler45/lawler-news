const { request, response } = require("express");
const db = require("../db/connection");
const { allTopics } = require("../models/topics_model");


const getTopics = (request, response, next) => {
  allTopics(response)
    .then((topic) => {
      response.status(200).send(topic);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { getTopics };
