"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require("express");
const { readFiles } = require("../controllers/fake/room");
const router = Router();
router.get("/", (req, res, next) => {
    let socket = req.app.get("socket");
    let io = req.app.get("io");
    if (socket) {
        socket.on("getAllRooms", () => {
            let rooms = readFiles();
            io.emit("allRooms", rooms);
        });
    }
    else {
        io.on("connection", (socket) => {
            console.log("h");
            socket.on("getAllRooms", () => {
                let rooms = readFiles();
                io.emit("allRooms", rooms);
            });
        });
    }
    res.render("rooms", {
        title: "All rooms"
    });
});
router.get("/:id", (req, res, next) => {
    res.render("room", {
        title: `Room`
    });
});
module.exports = router;
