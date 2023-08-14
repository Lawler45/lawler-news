const db = require("../db/connection");
const data = require("../db/data/development-data/index");
const fs = require("fs/promises");
const path = require("path");


const allEndpoints = () => {
  return fs.readFile('../endpoints.json', "utf-8").then((fileContent) => {
    console.log(fileContent);
    return JSON.parse(fileContent);
  });
};

module.exports = { allEndpoints };
