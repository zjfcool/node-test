var express = require('express');
var app = express();
var home = require('./home');
var login = require('./login');
var reg = require('./reg');
var logout = require('./logout');
var details = require('./details');
var push_blog = require('./push_blog');
var blog_table = require('./blog_table');
app.use('/',home);
app.use('/login',login);
app.use('/reg',reg);
app.use('/logout',logout);
app.use('/details',details);
app.use('/push_blog',push_blog);
app.use('/blog_table',blog_table);


module.exports = app;
