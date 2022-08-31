//
//
import Room from "../Components/room.js"


export default function Rooms(rooms, Alpine) {
  
  console.log(rooms)
  Room(Alpine);
  const template = document.createElement("template")
  template.innerHTML = `

  <link rel="stylesheet" href="/stylesheets/output.css"/>

  <div x-data="{
  name:'wodd'}" class="container overflow-scroll h-64 p-2 w-screen">
  <div id="list"></div>
  </div>
  `


  class Rooms_ extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({
        mode: "open"
      });
      let tem = document.createElement("div")
      for (var room of rooms) {

        let drd = document.createElement("sroom-list")

        const {
          name,
          _id,
          messages,
          members
        } = room
        drd.setAttribute("_id", _id)
        drd.setAttribute("name", name)
        drd.setAttribute("messages", messages)
        drd.setAttribute("members", members)

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

      Alpine.initTree(this.shadowRoot)

      document.querySelector("#addRoom").addEventListener("click", (e)=> {
        console.log(e)
        window.location.replace("rooms/addRoom")
      })

    }
    disconnectedCallback() {}
  }


  const el = window.customElements.get("rooms-list")
  if (el) {
    console.log(el)
  } else {
    window.customElements.define("rooms-list", Rooms_);
  }
}