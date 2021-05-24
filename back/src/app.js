const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const favicon = require('serve-favicon');
const cors = require('cors');
const createError = require('http-errors');
const path = require('path');
const bodyParser = require("body-parser");

const app = express(); // create a new app

const IS_PRODUCTION = app.get('env') === 'production'

if (IS_PRODUCTION) {
  app.set('trust proxy', 1) // secures the app if it is running behind Nginx/Apache/similar
}
app.use(cors()); // allows cross domain requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json()); // allows POST requests with JSON
app.use(express.urlencoded({ extended: false })); // allows POST requests with GET-like parameters
app.use(cookieParser()); // Parses cookies
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico'))) // <-- location of favicon
app.use(express.static(path.join(__dirname, '../public'))); // <-- location of public dir

app.use(session({ // handles sessions
  secret: 'keyboard cat', // <-- this should be a secret phrase
  cookie: { secure: IS_PRODUCTION }, // <-- secure only in production
  resave: true,
  saveUninitialized: true
}))

module.exports = app;