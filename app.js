var createError = require('http-errors');
var express = require('express');
var fs = require("fs");

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const http = require('http');
const server = http.createServer(app);
const {
  Server
} = require("socket.io");
const io = new Server(server);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));/*
app.use(express.static(path.join(__dirname, 'Templates')));*/
//
//


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
/**/
//
//
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err: {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    status: err.status,
    err: err
  });
});
server.listen(5000, ()=> {
  console.log("hfffe")
})
module.exports = app;