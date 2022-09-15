"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRoom = exports.singleRoom = void 0;
var User = require("../models/User");
var Room = require("../models/Room");
const singleRoom = async (req, res) => {
    const roomId = req.params.id;
    const room = await Room.findById(roomId);
    const user = req.user;
    if (room) {
        let members = room.members;
        var isthere = false;
        await members.map((member) => {
            if (member.name === user.name) {
                isthere = true;
            }
        });
        if (!isthere) {
            let newRooms = user.room.push(room);
            const update = {
                rooms: newRooms
            };
            const filter = {
                _id: user._id
            };
            let doc = await User.findOneAndUpdate(filter, update, {
                returnOriginal: false,
                new: true
            });
            let newMembers = room.members.push(room);
            const update2 = {
                members: newMembers
            };
            const filter2 = {
                _id: room._id
            };
            let doc2 = await Room.findOneAndUpdate(filter2, update2, {
                returnOriginal: false,
                new: true
            });
        }
        res.render("room", {
            room: room,
            user: req.user,
            title: room.name
        });
    }
    else {
        res.redirect("/rooms");
    }
};
exports.singleRoom = singleRoom;
const addRoom = async (req, res) => {
    const { name } = req.body;
    const user = req.user;
    const rroom = new Room({
        name: name,
        members: [user],
        admin: user,
        messages: []
    });
    rroom.save()
        .then(async (room) => {
        let newRooms = user.room.push(room);
        const update = {
            rooms: newRooms
        };
        const filter = {
            _id: user._id
        };
        let doc = await User.findOneAndUpdate(filter, update, {
            returnOriginal: false,
            new: true
        });
        console.log(":done");
        res.redirect(`/rooms/room/${room._id}`);
    }).catch(err => res.render("error", {
        error: err
    }));
};
exports.addRoom = addRoom;
module.exports = {
    singleRoom,
    addRoom
};
