"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const memoryModel = new mongoose_1.Schema({
    title: {
        type: String
    },
    body: {
        type: String
    },
    date: {
        type: Date
    },
    user: {
        type: String,
        required: true
    },
    reactions: {
        type: Array,
        required: true
    }
});
module.exports = (0, mongoose_1.model)("Memory", memoryModel);
