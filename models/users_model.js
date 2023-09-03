const db = require("../db/connection");
const data = require("../db/data/development-data/index");

const selectAllUsers = ()=>{
    return db.query(`SELECT * FROM users;`)
    .then(({rows})=>{
        return rows
    })
}

module.exports = {selectAllUsers}