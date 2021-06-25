
const models = require('./db');
const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send('<h1>hello Nodejs</h1>')
})

app.post("/login", function (req, res) {
    models.User
        .find({
            // userName: req.body.userName,
            // passWord: req.body.passWord
        })
        .then((users) => {
            console.log('user login reqqqqqqqqqqq -------------', req.body);
            console.log('user login res -------------', users);
            res.json(users)
        })
})

app.post("/lists", function (req, res) {
    models.List
        .find({
        })
        .then((lists) => {
            res.json(lists)
        })

})

module.exports = app;
