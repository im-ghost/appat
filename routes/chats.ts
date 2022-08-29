const {
  Router
} = require("express")


import {
  Request,
  Response,
  NextFunction
} from "express"

const router = Router();

router.get("/", (req:Request, res:Response, next:NextFunction)=> {
  res.render("chats", {
    title: "All chats"
  })
})


router.get("/:id", (req:Request, res:Response, next:NextFunction)=> {
  res.render("chat", {
    title: `chat`
  })
})

module.exports = router