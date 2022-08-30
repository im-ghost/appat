const createError = require('http-errors');
import express, {
  Request,
  Response,
  NextFunction,
  Application
} from "express"
var {
  connectDB
} = require("./config/db");

const fs = require("fs");
var room = require("./controllers/fake/room");

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const roomsRouter = require('./routes/rooms');
const chatsRouter = require('./routes/chats');

const app: Application = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const http = require('http');
const server = http.createServer(app);
//connectDB()
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
app.use(express.static(path.join(__dirname, 'public'))); /*
app.use(express.static(path.join(__dirname, 'Templates')));*/
//
//
app.set("io",io)

io.on('connection', (socket: any) => {
  app.set("socket", socket);

  console.log('a user connected');
  socket.on('chat message', (msg: any) => {
    io.emit('chat message', msg);
  });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chats', chatsRouter);
app.use('/rooms', roomsRouter);
/**/
//
//
// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
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