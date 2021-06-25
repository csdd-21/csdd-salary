const bcrypt = require('bcrypt')
const express = require('express');
const models = require('./db');
const { jwtSign, jwtCheck } = require('./jwt')

const app = express();
app.get('/', function (req, res) {
    res.send('<h1>hello Nodejs</h1>')
})

app.post("/login", function (req, res) {
    models.User
        .find({
            userName: req.body.userName,
        })
        .then((user) => {
            if (user.length <= 0) {
                res.send({ 'status': 416, 'error_message': '用户未注册'});
            }
            const isPwdValid = bcrypt.compareSync(req.body.password, user.data[0].password)
            console.log('isPwdValid',isPwdValid);
            
            console.log('user login reqqqqqqqqqqq -------------', req.body);
            console.log('user login res -------------', user);
            res.json(user)
        })
        .catch((err) => {
            console.log('models.User err ---', err);
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
        .catch((err) => {
            console.log('models.List err ---', err);
        })
})

module.exports = app;
