//
//
//
//
///
let loa = false;
let songs = [];
let setLoaded = (e)=> {
  loa = e
}
let setSongs = (e) => {
  let d = [...e]
  songs = d.map(f=> {
    f.src = "file://"+ f.dir + "/"+f.base;
    f.d = crypto.randomUUID()
    return f
  })
}
setTimeout(function() {

  fetch("/songs")
  .then((res)=>res.json())
  .then(data=> {

    setSongs(data.songs)
    setLoaded(true)
  })
}, 2000);
document.addEventListener('alpine:init', () => {
  Alpine.data('allsongs', () => ({
    init() {
      setTimeout(function() {
        this.songs = songs
        document.querySelector("#btn").click()
      }, 5000);
    },
    render() {
      this.songs = songs
    },
    play(song) {
      let aud = new Audio()
      aud.src = song.src
      console.log(aud.src)
      var playPromise = aud.play();
      // In browsers that don’t yet support this functionality,
      // playPromise won’t be defined.
      if (playPromise !== undefined) {
        playPromise.then(function() {
          console.log("start")
          // Automatic playback started!
        }).catch(function(error) {
          // Automatic playback failed.
          // Show a UI element to let the user manually start playback.
          console.log("e"+error)
          document.body.addEventListener("click", ()=> {
            aud.play()
          })
        });
      }
    },
    songs: []
  }))



})/*
const start = ()=> {
  setTimeout(function() {
    this.songs = songs
    console.log(songs)
    let dd = document.createElement("div")
    dd.innerHTML = `
    <p x-text="songs"></p>


    `
    document.querySelector("#songs").innerHTML = dd.innerHTML
    console.log(dd)
  }, 4000);
}
start();*/
//
//
//
//