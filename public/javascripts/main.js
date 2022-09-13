//
//
var socket = io();

window.socket = socket;
socket.emit("allRooms")
//Them
let theme;

theme = localStorage.getItem("appat-theme") ||
!!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
? 'dark': 'light'

document.documentElement.classList.add(theme)

console.log(theme)
let toggler = document.querySelector("#theme")
toggler.addEventListener("click", ()=> {
  
    document.documentElement.classList.remove(theme)
  
  theme = theme === "dark" ? "light" :"dark";
    localStorage.setItem("appat-theme", theme)
document.documentElement.classList.add(theme)

  console.log(theme)
})
/* += item;
  window.scrollTo(0, document.body.scrollHeight);
});

*/