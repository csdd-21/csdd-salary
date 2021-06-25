const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/csdd-config");
mongoose.connection.on('connected', function () {
    console.log("------ mongodb数据库成功！------");
});

const User = mongoose.model('User', new mongoose.Schema({
    userName: { type: String, require: true },
    passWord: { type: String, require: true },
}))

const Models = {
    User: User
};

// 新增数据
// User.create({
//     userName: "test_00",
//     passWord: "testttttt"
// }, function (err, doc) {
//     if (!err) {
//         // console.log(doc);
//     } else {
//         console.log(err);
//     }
// })

module.exports = Models;
