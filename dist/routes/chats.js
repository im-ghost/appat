"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require("express");
const { ensureAuth, ensureGuest } = require('../Middlewares/auth');
const router = Router();
router.get("/", ensureAuth, (req, res, next) => {
    res.render("chats", {
        title: "All chats"
    });
});
router.get("/:id", ensureAuth, (req, res, next) => {
    res.render("chat", {
        title: `chat`
    });
});
module.exports = router;
