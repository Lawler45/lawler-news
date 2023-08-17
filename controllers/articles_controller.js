const {
  articleId,
  allArticles,
  allComments,
} = require("../models/articles_model");

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
  articleId(id)
    .then(() => {
      return allComments(id);
    })
    .then((comments) => {
      if (!comments.length) {
        response.status(200).send({ msg: "no comments" });
      } else {
        response.status(200).send({comments});
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { getArticleByID, getArticles, getComments };
