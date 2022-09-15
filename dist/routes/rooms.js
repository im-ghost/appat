"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require("express");
var path = require("path");
var Room = require("../models/Room");
const { ensureAuth, ensureGuest } = require('../Middlewares/auth');
const room_1 = require("../controllers/room");
const router = Router();
router.get("/", ensureAuth, async (req, res) => {
    let rooms = await Room.find({});
    if (rooms) {
        res.render("rooms", {
            title: "Rooms",
            rooms: rooms
        });
    }
    else {
        console.log(rooms);
    }
});
router.get("/room/:id", ensureAuth, room_1.singleRoom);
router.post("/addRoom", ensureAuth, room_1.addRoom);
router.get("/addRoom", ensureAuth, (req, res) => res.render("addRoom"));
module.exports = router;
//
//*
/**/ 
