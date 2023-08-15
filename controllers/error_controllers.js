const { request, response } = require("express");
const db = require("../db/connection");
const { articleId } = require("../models/articles_model");

const handle400s = (error, request, response, next) => {
    if (error.code === '22P02'){
        response.status(400).send({msg: 'Bad Request'})
    }else{
        next(error)
    }
}

const handleCustomErrors = (error, request, response, next) => {
    if(error.status && error.msg){
        response.status(error.status).send({msg: error.msg})
    }else{
        next(error)
    }
}
module.exports = {handle400s, handleCustomErrors}