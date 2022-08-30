"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userModel = new mongoose_1.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    rooms: {
        type: Array
    }
});
module.exports = (0, mongoose_1.model)("User", userModel);
