const {
  Router
} = require("express")
const router = Router();

router.get("/", (req, res, next)=> {
  res.render("rooms", {
    title: "All rooms"
  })
})


router.get("/:id", (req, res, next)=> {
  res.render("room", {
    title: `Room`
  })
})

module.exports = router