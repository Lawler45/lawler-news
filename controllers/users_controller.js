const { selectAllUsers } = require("../models/users_model");

const getUsers = (request, response, next) => {

  selectAllUsers(response)

    .then((users) => {
      response.status(200).send(users);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { getUsers };
