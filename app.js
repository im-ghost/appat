var createError = require('http-errors');
var express = require('express');
var fs = require("fs");

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
var {
  getfiles
} = require("./controllers/getFiles");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//read files
     //console.log(getfiles())
/*
const directory = "/storage";
const musicFiles = [];
const isReadable = (file) => {
  fs.access(file, fs.R_OK, (err) => {
    if (err) {
      console.log(err)
      return false
    } else {
      console.log("read")
      return true
    }
  });

}
const readFiles = (dir)=> {
  const files = fs.readdirSync(dir)
  files.map((fil)=> {
    let file = path.join(dir, fil);
    console.log(file)
    if (isReadable(file)) {
  const stat = fs.statSync(file)
  console.log(stat)
  if (stat.isDirectory()) {
    console.log(file)
    readFiles(file)
  } else {
    musicFiles.push(file)
  }
    } else {
      console.log("err")
    }
})
return musicFiles
}
console.log(readFiles(directory))*/
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
app.listen(5000, ()=> {
  console.log("hfffe")
})
module.exports = app;