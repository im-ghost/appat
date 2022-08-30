"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require("express");
const router = Router();
router.get("/", (req, res, next) => {
    res.render("chats", {
        title: "All chats"
    });
});
router.get("/:id", (req, res, next) => {
    res.render("chat", {
        title: `chat`
    });
});
module.exports = router;
