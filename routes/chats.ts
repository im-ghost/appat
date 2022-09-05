const {
  Router
} = require("express")

const {
  ensureAuth,
  ensureGuest
} = require('../Middlewares/auth');


import {
  Request,
  Response,
  NextFunction
} from "express"

const router = Router();

router.get("/",ensureAuth, (req:Request, res:Response, next:NextFunction)=> {
  res.render("chats", {
    title: "All chats"
  })
})


router.get("/:id",ensureAuth, (req:Request, res:Response, next:NextFunction)=> {
  res.render("chat", {
    title: `chat`
  })
})

module.exports = router