
const express = require('express');
const mongoose = require('mongoose');
const {json} = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/csdd-config");
mongoose.connection.on('connected', function () {
    console.log("mongodb数据库成功！");
});

const User = mongoose.model('User', new mongoose.Schema({
    userName: { type: String, require: true },
    passWord: { type: String, require: true },
}))

// 新增数据
// User.create({
//     userName: "test_01",
//     passWord: "11"
// }, function (err, doc) {
//     if (!err) {
//         // console.log(doc);
//     } else {
//         console.log(err);
//     }
// })

//删除数据
// User.remove({ age: 20 }, function (err, doc) {
//   console.log(doc);
// })

//修改数据
// User.update({ name: "功夫熊猫1" }, { $set: { age: 28 } }, function (err, doc) {
//   console.log(doc);
// })

const app = express();

app.get('/', function (req, res) {
    res.send('<h1>hello Nodejs</h1>')
})

app.get("/login", function (req, res) {

    User
        .find({
            // userName: req.query.userName,
            // passWord:  req.query.passWord
        })
        .exec()
        .then((res) => {
            console.log('user login res -------------',res); 
            res.json(res)
        })

})

app.listen('8000', function () {
    console.log("8000");
})