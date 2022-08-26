var createError = require('http-errors');
var express = require('express');
var fs = require("fs");

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//
//


var fs = require("fs");
var path = require("path");

var musicArray = [];

var done = [];
const setDone = (payload) => {
  done.push(payload)
}

const getfiles = async (req, res, next)=> {

  const directoryPath = "/storage/emulated/0/";
  const directoryPath2 = "/storage/sdcard0/";

  async function fromDir(startPath, filter) {


    if (!fs.existsSync(startPath)) {
      console.log("no dir ", startPath);
      return;
    }


    var files = await fs.readdirSync(startPath);


    for (var i = 0; i < files.length; i++) {

      let filename = path.join(startPath, files[i]);
      await fs.access(filename, fs.constants.R_OK, async (err)=> {
        if (err) {} else {
          var stat = fs.lstatSync(filename)



          if (stat.isDirectory()) {
            fromDir(filename, filter);

          } else if (filename.endsWith(filter)) {
            let fileObj = path.parse(filename);
            musicArray.push(fileObj);
            //
          }
        }
      });
    }
    return musicArray

  }



  await fromDir(directoryPath,".mp3")
  await fromDir(directoryPath2,".mp3")


}
getfiles()


app.get("/songs", (req, res)=> {
  res.status(200).json({
    songs: musicArray
  })
})
io.on('connection', (socket) => {
  console.log('a user connected');
});

app.get("/", (req, res)=>res.sendFile(__dirname, "/Templates/index.html"))
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
app.listen(5000, ()=> {
  console.log("hfffe")
})
module.exports = app;