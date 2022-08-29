const {
  Router
} = require("express")

import {
  Request,
  Response,
  NextFunction
} from "express"

const router = Router();

router.get("/", (req: Request, res:Response, next:NextFunction)=> {
  res.render("rooms", {
    title: "All rooms"
  })
})


router.get("/:id", (req: Request, res: Response, next:NextFunction)=> {
  res.render("room", {
    title: `Room`
  })
})

module.exports = router