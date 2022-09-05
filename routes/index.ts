var express = require('express');

import {
  Request,
  Response,
  NextFunction
} from "express"

const {
  ensureAuth,
  ensureGuest
} = require('../Middlewares/auth');

var router = express.Router();

/* GET home page. */
router.get('/', ensureAuth,function(req: Request, res: Response, next: NextFunction) {
  res.render('index', {
    title: 'Appat'
  });
});

module.exports = router;