"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
const { ensureAuth, ensureGuest } = require('../Middlewares/auth');
var router = express.Router();
/* GET home page. */
router.get('/', ensureAuth, function (req, res, next) {
    res.render('index', {
        title: 'Appat'
    });
});
module.exports = router;
