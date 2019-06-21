require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const router = require('../src/controllers/index');
const { capitalize } = require('./helpers/capitalize');
const { lowerCase } = require('./helpers/lowercase');

const app = express();

// Some things might be missing...
app.use(express.static(path.join(__dirname, '..', 'public')));
app.disable('x-powered-by');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.set('host', process.env.HOST || 'localhost');
app.set('port', process.env.PORT || 3333);

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'hbs');
app.engine('hbs',
exphbs({
  extname: 'hbs',
  layoutsDir: path.join(__dirname, "views", "layouts"),
  defaultLayout: 'main',
  partialsDir: path.join(__dirname, "views", "partials"),
  helpers: {
    capitalize,
    lowerCase
  }
}));

app.use(router);

app.use((err, req, res, next) => {
  if (res.status === 500) {
    errors.serverError(err, res)
  } else next();
});

module.exports = app;
