"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMemory = exports.allMemories = void 0;
const Memory = require("../models/memory");
const allMemories = async (req, res) => {
    const user = req.user;
    const friendsId = user.friends;
    let friends = [];
    await friendsId.map(async (id) => {
        let user = await User.findById(id);
        if (user) {
            friends.push(user);
        }
    });
    const allMemories = [];
    await friends.map((friend) => {
        friend.memories.map((memory) => {
            allMemories.push(memory);
        });
    });
    const memories = [...allMemories, user.memories];
    await memories.map(async (memory) => {
        let userId = memory.user;
        const user = await User.findById(userId);
        if (user) {
            memory.userObj = user;
        }
    });
    res.render("memories", {
        title: "Memories",
        user: req.user,
        memories: memories
    });
};
exports.allMemories = allMemories;
const addMemory = async (req, res) => {
    const { title, body, } = req.body;
    const user = req.user;
    const memory = new Memory({
        title: title,
        user: user,
        body: body,
        date: new Date
    });
    memory.save()
        .then(async (memory) => {
        let newMemories = user.memories.push(memory);
        const update = {
            memories: newMemories
        };
        const filter = {
            _id: user._id
        };
        let doc = await User.findOneAndUpdate(filter, update, {
            returnOriginal: false,
            new: true
        });
        console.log(":done");
        res.redirect(`/memories/memory/${memory._id}`);
    }).catch(err => res.render("error", {
        error: err
    }));
};
exports.addMemory = addMemory;
module.exports = {
    allMemories,
    addMemory
};
