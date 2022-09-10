//
//
const template = document.createElement("template")
template.innerHTML = `

<link rel="stylesheet" href="/stylesheets/output.css"/>

<div x-data="" class="container overflow-scroll h-[80vh] p-2 w-screen border-4 border-groove text-bold text-lg shadow">
<div id="list"></div>
</div>
`

const template2 = document.createElement("template")
template2.innerHTML = `

<link rel="stylesheet" href="/stylesheets/output.css"/>

<div x-data="sroomlist" class="container overflow-scroll h-[20vh] p-2 w-screen border-4 border-groove text-bold text-lg shadow">
<h1 x-text="name">Got here sh</h1>
<p x-text="lastMessage"></p>
</div>
`



class Rooms_ extends HTMLElement {
  constructor(rooms) {
    super();
    this.attachShadow({
      mode: "open"
    });
    let tem = document.createElement("div")
    this.rooms = JSON.parse(this.getAttribute("rooms"))
    for (var room of this.rooms) {

      let drd = document.createElement("sroom-list")
      drd.setAttribute("room", JSON.stringify(room))

      tem.appendChild(drd)
    }
    console.log(tem)

    this.shadowRoot.appendChild(template.content.cloneNode(true))

    const dom = this.shadowRoot;
    const sel = (el) => {
      return dom.querySelector(el)
    }

    this.shadowRoot.querySelector("#list").innerHTML = tem.innerHTML;

    console.log(template)
  }
  connectedCallback() {
    /*
    Alpine.initTree(this.shadowRoot)
*/
    document.querySelector("#addRoom").addEventListener("click", (e)=> {
      console.log(e)
      window.location.replace("rooms/addRoom")
    })

  }
  disconnectedCallback() {}
}
class Room extends HTMLElement {
  constructor() {

    super();
    this.attachShadow({
      mode: "open"
    });
    this.shadowRoot.appendChild(template2.content.cloneNode(true))

    const dom = this.shadowRoot;
    const sel = (el) => {
      return dom.querySelector(el)
    }
  }
  get room () {
    return JSON.parse(this.getAttribute("room"))
  }
  connectedCallback() {
    document.addEventListener('alpine:init', () => {
      Alpine.data('sroomlist', () => ({
        init() {
          console.log(this.room)
        },

        name: this.room.name,
        lastMessage: this.room.messages[this.room.messages.length-1].text
      }))


      Alpine.initTree(this.shadowRoot)
    })
    /*
*/
  }
  disconnectedCallback() {}
}


const el = window.customElements.get("rooms-list")
if (el) {
  console.log(el)
} else {
  window.customElements.define("rooms-list", Rooms_);
}

const el2 = window.customElements.get("sroom-list")
if (el2) {
  console.log(el2)
} else {
  window.customElements.define("sroom-list", Room);


}