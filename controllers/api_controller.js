const { request, response } = require("express");
const db = require("../db/connection");
const endPoints = require(`${__dirname}/../endpoints.json`);

const getEndpoints = (request, response, next) => {
  response.status(200).send({ endPoints });
};
module.exports = { getEndpoints };
