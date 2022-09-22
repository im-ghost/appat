const createError = require('http-errors');
import express, {
  Request,
  Response,
  NextFunction,
  Application
} from "express"
const {
  ensureAuth,
  ensureGuest
} = require('./Middlewares/auth');

var {
  connectDB
} = require("./config/db");

const fs = require("fs");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const methodOverride = require('method-override')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const passport = require('passport');
require('./services/passport')(passport)
require('./services/google')(passport)
require('./services/twitter')(passport)
require('./services/email')(passport)




const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const roomsRouter = require('./routes/rooms');
const chatsRouter = require('./routes/chats');
const authRouter = require('./routes/auth');
const memoriesRouter = require('./routes/memories');
const friendsRouter = require('./routes/friends');

const app: Application = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const http = require('http');
const server = http.createServer(app);
connectDB()
const {
  Server
} = require("socket.io");
const io = new Server(server);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
/*
// Method override
app.use(
  methodOverride(function (req: Request, res: Response) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  })
)
*/
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); /*
app.use(express.static(path.join(__dirname, 'Templates')));*/
//
//
app.set("io", io)

io.on('connection', (socket: any) => {
  console.log('a user connected');
  require("./controllers/socket")(socket, io)
});

// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set global var
app.use(function (req: any, res: Response, next: NextFunction) {
  res.locals.user = req.user || null
  next()
})

app.use('/', memoriesRouter);
app.use('/profile', memoriesRouter);
app.use('/notifications', memoriesRouter);
app.use('/users', usersRouter);
app.use('/chats', chatsRouter); /*
app.use('/friends', friendsRouter);*/
app.use('/rooms', roomsRouter); /*
app.use('/memories', memoriesRouter);*/
app.use('/auth', authRouter);
/**/
//
//

app.get("/favicon.png", (req: Request, res: Response)=>res.sendFile(path.join(__dirname, "/images/favecon.png")))
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
  res.render("error", {
    status: err.status,
    err: err
  });
});
server.listen(5000, ()=> {
  console.log("hfffe")
})
module.exports = app;