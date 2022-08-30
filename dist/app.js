"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createError = require('http-errors');
const express_1 = __importDefault(require("express"));
var { connectDB } = require("./config/db");
const fs = require("fs");
var room = require("./controllers/fake/room");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const roomsRouter = require('./routes/rooms');
const chatsRouter = require('./routes/chats');
const app = (0, express_1.default)();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
const http = require('http');
const server = http.createServer(app);
//connectDB()
const { Server } = require("socket.io");
const io = new Server(server);
app.use(logger('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express_1.default.static(path.join(__dirname, 'public'))); /*
app.use(express.static(path.join(__dirname, 'Templates')));*/
//
//
app.set("io", io);
io.on('connection', (socket) => {
    app.set("socket", socket);
    console.log('a user connected');
    socket.on('chat message', (msg) => {
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
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.send({
        status: err.status,
        err: err
    });
});
server.listen(5000, () => {
    console.log("hfffe");
});
module.exports = app;
