var express = require('express');
var app = express();


var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var session = require('express-session');
var methodOverride = require('method-override');
var router = require('../app/routes/router');

require('dotenv').load();

mongoose.connect(process.env.DB);

//serve static files from public
app.use(express.static(__dirname + '/../public'));

//parse body contents as a JSON objects
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(session({
  saveUninitialized: false,
  secret: process.env.KEY,
  resave: false
}));

app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

app.use('/api', router);

app.get('*', function(req, res) {
  res.sendFile(process.cwd() + '/public/index.html');
});

exports = module.exports = app;
