var express = require('express');

import {
  Request,
  Response,
  NextFunction
} from "express"

var router = express.Router();

/* GET home page. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  setTimeout(()=> {
    console.log("a"+req.app.get("socket"))
  }, 6000)
  res.render('index', {
    title: 'Appat'
  });
});

module.exports = router;