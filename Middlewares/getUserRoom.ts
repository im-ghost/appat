module.exports = (req, res, next)=> {
  const userRooms = req.body.user.rooms;
  const roomId = req.params.id;
   const dRoom = userRooms.find((room)=> room._id === roomId)

   req.room = dRoom

  next()
}