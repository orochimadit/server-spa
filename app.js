var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const  divisionRouter = require('./app/division/router');
const  goodRouter = require('./app/goods/router');
const  merkRouter = require('./app/merk/router');
const  typeRouter = require('./app/type/router');
const  fundRouter = require('./app/fund/router');
const  materialRouter = require('./app/material/router');
const  inventoryBookRouter = require('./app/inventory_book/router');
const authRouter = require('./app/auth/router');

const {decodeToken}= require('./app/auth/middleware');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api',divisionRouter);
app.use('/api',goodRouter);
app.use('/api',merkRouter);
app.use('/api',typeRouter);
app.use('/api',fundRouter);
app.use('/api',materialRouter);
app.use('/api',inventoryBookRouter);
app.use('/auth',authRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(decodeToken());
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
