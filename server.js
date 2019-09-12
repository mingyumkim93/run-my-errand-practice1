var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var bcrypt = require("bcrypt");
var path = require("path");
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var session = require('express-session');
app.use(session({
  secret: 'alskdjskal',
  resave: false,
  saveUninitialized: false
}));

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());

let db = require("./mysqlhelper");
let errandApi = require("./errandapi");
let userApi = require('./userapi');
let reviewApi = require('./reviewapi');
let offerApi = require("./offerapi");
let mypassport = require("./passport");

errandApi(app, db);
userApi(app, db, bcrypt);
reviewApi(app, db);
offerApi(app, db);
mypassport(app, db, passport, LocalStrategy, bcrypt);

app.listen(8080);


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})