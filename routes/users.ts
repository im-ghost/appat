var express = require('express');

import {
  Request,
  Response,
  NextFunction
} from "express"

import {
  USERS
} from "../interfaces/USER"

var router = express.Router();

/* GET users listing. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.send('respond with a resource');
});

module.exports = router;