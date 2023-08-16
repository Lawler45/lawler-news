const { request, response } = require("express");
const db = require("../db/connection");
const {
  articleId,
  allArticles,
  allComments,
} = require("../models/articles_model");
const { checkExists } = require("../utils");

const getArticleByID = (request, response, next) => {
  const id = request.params.article_id;
  articleId(id)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((error) => {
      next(error);
    });
};
const getArticles = (request, response, next) => {
  allArticles(response)
    .then((article) => {
      response.status(200).send(article);
    })
    .catch((error) => {
      next(error);
    });
};

const getComments = (request, response, next) => {
  const id = request.params.article_id;
  allComments(id)
    .then((article) => {
      if (!article.length) {
        return response.status(404).send({ msg: "article does not exist" });
      }
      return allComments(id);
    })
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { getArticleByID, getArticles, getComments };
