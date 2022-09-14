const {
  Router
} = require("express")
const router = Router();

const {
  ensureAuth,
  ensureGuest
} = require('../Middlewares/auth');

import {
  Request,
  Response,
  NextFunction
} from "express"
const Memory = require("../models/memories")
router.get("/", ensureAuth, (req: Request, res: Response)=> {
  res.render("memories",{
    title:"Memories",
    user:req.user,
  })
})

router.get("/:id", ensureAuth,async (req: Request, res: Response)=> {
  
  const memoryId = req.params.id;
  const memory = await Memyory.findById(memoryId);
  if(memory){
  res.render("memory",{
    memory:memory,
    title:memory.title,
    user:req.user
  })
  }
  else{
    res.redirect("/memories")
})


module.exports = router