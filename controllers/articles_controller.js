const { request, response } = require("express");
const db = require("../db/connection");
const { articleId } = require("../models/articles_model");

const getArticleByID = (request, response, next) => {
  const id = request.params.article_id;
  articleId(id)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

module.exports = { getArticleByID };
