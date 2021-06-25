
const models = require('./db');
const { jwtSign, jwtCheck } = require('./jwt')
const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send('<h1>hello Nodejs</h1>')
})

app.post("/login", function (req, res) {
    models.User
        .find({
            userName: req.body,
            passWord: req.body.passWord
        })
        .then((users) => {
            console.log('user login reqqqqqqqqqqq -------------', req.body);
            console.log('user login res -------------', users);
            res.json(users)
        })
        .catch((err)=>{
console.log('err ---',err);

        })
})

app.get("/lists", function (req, res) {
    models.List
        .find({
        })
        .then((lists) => {
            console.log('user login reqqqqqqqqqqq -------------', req.body);
            console.log('user login res -------------', lists);
            res.json(lists)
        })
})

module.exports = app;
