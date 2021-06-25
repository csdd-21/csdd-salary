const { json } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
// const api = require('./api');


const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/csdd-config-test");
mongoose.connection.on('connected', function () {
    console.log("mongodb数据库成功！");
});


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(api);
app.listen('9000', function () {
    console.log("node express run in port 9000 !");
})
