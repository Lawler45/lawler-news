const { createComment, removeComment } = require("../models/comments_model");
const { articleId } = require("../models/articles_model");

const postComment = (request, response, next) => {
  const { article_id } = request.params;
  const { username, body } = request.body;

  const promises = [
    articleId(article_id),
    createComment(article_id, username, body),
  ];

  return Promise.all(promises)
    .then((resolvedPromises) => {
      response.status(201).send({ comment: resolvedPromises[1] });
    })
    .catch((error) => {
      next(error);
    });
};

const deleteComment = (request, response, next) => {
  const { comment_id } = request.params;

  removeComment(comment_id)

    .then(() => {
      response.status(204).send();
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { postComment, deleteComment };
