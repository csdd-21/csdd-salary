const { json } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect("mongodb://127.0.0.1:27017/lists");
mongoose.connection.on('connected', function () {
    console.log("mongodb数据库成功！");
});

const List = mongoose.model('List', new mongoose.Schema({
    month: { type: Number, require: true },
    realSalary: { type: Number, require: true },
    rent: { type: Number, require: true },
    utilities: { type: Number, require: true },
    shop: { type: Number, require: true },
    deposit: { type: Number, require: true },
    remark: { type: String, require: false },
    action: { type: String, require: true }
}))

// 新增数据
List.create({
    month: 1,
    realSalary: 1,
    rent:1,
    utilities: 1,
    shop: 1,
    deposit:1,
    remark: "",
    action: ""
}, function (err, doc) {
    if (!err) {
        // console.log(doc);
    } else {
        console.log(err);
    }
})

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

app.post("/lists", function (req, res) {

    List
        .find({
        })
 
        .then((lists) => {
            res.json(lists)
        })

})

app.listen('9000', function () {
    console.log("9000");
})