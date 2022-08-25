var fs = require("fs");
var path = require("path");

var musicArray = [];
var done = [];
const setDone = (payload) =>{
  done.push(payload)
}

const getfiles = async (req, res, next)=> {

  const directoryPath = "/storage/";

  async function fromDir(startPath, filter) {


    if (!fs.existsSync(startPath)) {
      console.log("no dir ", startPath);
      return;
    }


    var files = await fs.readdirSync(startPath);


    for (var i = 0; i < files.length; i++) {

      let filename = path.join(startPath, files[i]);
      await fs.access(filename, fs.constants.R_OK, async (err)=> {
        if (err) {} else {
          var stat = fs.lstatSync(filename)



          if (stat.isDirectory()) {
            setDone(false)
            await fromDir(filename, filter);
          } else if (filename.endsWith(filter)) {
            let fileObj = path.parse(filename);
            musicArray.push(fileObj);
            //
          }
        }
      });
    }

    return musicArray

  }



  return fromDir(directoryPath,
    ".mp3")
}
getfiles()
.then((files)=> {
  console.log(files.length)
})
exports.default = {
  getfiles
}