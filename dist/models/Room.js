"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userModel = new mongoose_1.Schema({
    name: {
        type: String
    },
    members: {
        type: Array
    },
    messages: {
        type: Array
    }
});
module.exports = (0, mongoose_1.model)("Room", userModel);
