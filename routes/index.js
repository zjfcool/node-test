var express = require('express');
var app = express();
var home = require('./home');
var login = require('./login');
var reg = require('./reg');
var logout = require('./logout');

app.use('/',home);
app.use('/login',login);
app.use('/reg',reg);
app.use('/logout',logout);


module.exports = app;
