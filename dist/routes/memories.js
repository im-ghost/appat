"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require("express");
const router = Router();
const { ensureAuth, ensureGuest } = require('../Middlewares/auth');
const Memory = require("../models/memory");
const { allMemories, addMemory } = require("../controllers/memory");
router.get("/", ensureAuth, allMemories);
router.post("/addMemory", ensureAuth, addMemory);
router.get("/addMemory", ensureAuth, (req, res) => res.render("addMemory"));
router.get("/memory/:id", ensureAuth, async (req, res) => {
    const memoryId = req.params.id;
    const memory = await Memory.findById(memoryId);
    if (memory) {
        res.render("memory", {
            memory: memory,
            title: memory.title,
            user: req.user
        });
    }
    else {
        res.redirect("/memories");
    }
});
module.exports = router;
