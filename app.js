
var express = require('express');

var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname + '/web-app')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/web-app/index.html'));
});

module.exports = app;
