require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require("./config/database");
var bodyParser = require('body-parser');

var app = express();

var expressSwagger = require('express-swagger-generator')(app);
let optionExpressSwagger = {
  swaggerDefinition: {
    info: {
      title: 'Simple CRUD Event',
      description: 'This is a sample server',
      version: '1.0.0',
    },
    host: 'localhost:'+process.env.APP_PORT,
    basePath: '',
    produces: [
      "application/json"
    ],
    consumes: [
      "multipart/form-data"
    ],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: "",
      }
    }
  },
  basedir: __dirname, //app absolute path
  files: ['./routes/**/*.js'] //Path to the API handle folder
}
expressSwagger(optionExpressSwagger);

app.use(bodyParser.json());

db.sequelize.sync({ force: true, alter: true }).then(() => {
  console.log("Drop and re-sync db.");
});

var webRouter = require('./routes/web');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('', webRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
