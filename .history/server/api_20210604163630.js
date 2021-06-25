const bcrypt = require('bcrypt')
const express = require('express');
const models = require('./db');
const { jwtSign, jwtCheck } = require('./jwt')

const app = express();
app.get('/', function (req, res) {
    res.send('<h1>hello Nodejs</h1>')
})

app.post("/register", function (req, res) {
    models.User
        .find({
            username: req.body.username
        })
        .then(user => {
            if (user.length > 0) {
                res.send({ 'status': 403, 'message': '该用户名已经注册' });
            } else {
                const hashPwd = bcrypt.hashSync(req.body.password, 10)
                let newUser = models.User({
                    username: req.body.username,
                    password: hashPwd
                });
                newUser.save((err, data) => {
                    if (err) {
                        res.send({ 'status': 403, 'message': '注册失败', 'error': err });
                    } else {
                        res.send({ 'status': 200, 'message': '注册成功' });
                    }
                });
            }
        })
        .catch(err => {
            res.send({ 'status': 403, 'message': '注册失败', 'error': err });
        })
})

app.post("/login", function (req, res) {
    models.User
        .find({
            username: req.body.username,
        })
        .then((user) => {
            if (user.length <= 0) {
                res.send({ 'status': 416, 'error_message': '用户未注册' });
            }
            const isPwdValid = bcrypt.compareSync(req.body.password, user[0].password)
            if (isPwdValid) {
                const token = jwtSign({ _id: user[0]._id })
                res.send({ 'status': 200, 'message': '登录成功！', 'data': { token: token, _id: user[0]._id } });
            } else {
                res.send({ 'status': 401, 'message': '密码错误！', 'error': err});
            }
            console.log('isPwdValid', isPwdValid);
            console.log('user login reqqqqqqqqqqq -------------', req.body);
            console.log('user login res -------------', user);
            res.json(user)
        })
        .catch((err) => {
            res.send({ 'status': 403, 'message': '登录失败', 'error': err });
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
            res.send({ 'status': 403, 'message': '查询lists失败', 'error': err });
        })
})

module.exports = app;
