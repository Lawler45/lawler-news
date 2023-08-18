const {
  articleId,
  allArticles,
  allComments,
  patchArticleVotes,
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
  const promises = [articleId(id), allComments(id)];

  Promise.all(promises)

    .then((resolvedPromises) => {
      response.status(200).send({ comments: resolvedPromises[1] });
    })
    .catch((error) => {
      next(error);
    });
};

const patchArticle = (request, response, next) => {
  const { article_id } = request.params;
  const { inc_votes } = request.body;

  patchArticleVotes(article_id, inc_votes)
    .then((article) => {
      if (article === undefined) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      response.status(200).send(article);
    })
    .catch((error) => {
      next(error);
    });
};



module.exports = { getArticleByID, getArticles, getComments, patchArticle };
