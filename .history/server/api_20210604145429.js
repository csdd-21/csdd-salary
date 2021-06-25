
const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send('<h1>hello Nodejs</h1>')
})

app.post("/login", function (req, res) {

    User
        .find({
            userName: req.body.userName,
            passWord:  req.body.passWord
        })
 
        .then((users) => {
            // console.log('user login reqqqqqqqqqqq -------------',req); 
            console.log('user login reqqqqqqqqqqq -------------',req.body); 
            console.log('user login res -------------',users); 
            res.json(users)
        })

})

module.exports = api;
