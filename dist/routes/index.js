"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    setTimeout(() => {
        console.log("a" + req.app.get("socket"));
    }, 6000);
    res.render('index', {
        title: 'Appat'
    });
});
module.exports = router;
