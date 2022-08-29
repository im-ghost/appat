//
var fs = require("fs");
var path = require("path")
var filepath = path.resolve(__dirname, "../../fakedata.json")
const readFile = async(file: string)=> {
  try {
    const res = await fs.readFileSync(path.resolve(__dirname, file), "utf8")


    return JSON.parse(res)
  } catch(e) {
    console.log(e)
    return
  }
}
const cota = async () => {
  let dddr = await readFile("../../fakedata.json")
  return dddr
}
const addRoom = async(body: any)=> {
  cota()
  .then(async (dat)=> {
    let req = body;
    let dd = dat
    dd.rooms.push(req)
    await fs.writeFile(filepath,
      JSON.stringify(dd),
      (err: any)=> {
        if (err) {
          console.log(err);
          return err
        }
        console.log("saved")

      })
  })
}
addRoom({
  name: "me",
  _id: 300,
  members: [],
  messages: []
})
module.exports = {
  readFile
}
//
//



//