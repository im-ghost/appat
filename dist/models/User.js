"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userModel = new mongoose_1.Schema({
    displayName: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    image: {
        type: String
    },
    googleId: {
        type: String
    },
    email: {
        type: String
    },
    rooms: {
        type: Array
    },
    password: {
        type: String, required: true
    },
    memories: {
        type: Array
    },
    friends: { type: Array }
});
module.exports = (0, mongoose_1.model)("User", userModel);
