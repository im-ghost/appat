//
//

export default function Room(Alpine) {

  const template = document.createElement("template")
  template.innerHTML = `

  <link rel="stylesheet" href="/stylesheets/output.css"/>

  <div x-data="room" class="container overflow-scroll h-32  p-2 w-screen">
  <a id="link">
  <h1 x-text="name">Alpine sha</h1>
  </a>
  </div>
  `


  class Room_ extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({
        mode: "open"
      });
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      const dom = this.shadowRoot;
      const sel = (el) => {
        return dom.querySelector(el)
      }

      this.name = this.getAttribute("name")
      this._id = this.getAttribute("_id")
      this.messages = this.getAttribute("messages")
      this.members = this.getAttribute("members")
      sel("#link").setAttribute("href",`room/${this._id}`)
    }
    connectedCallback() {

      alert("alpine ")
      Alpine.data('room', () => ({
        init() {
          console.log("init")
        },
        name: this.name,
        members: this.members,
        messages: this.messages,
        _id: this._id
      }))
      Alpine.initTree(this.shadowRoot)

    }
    disconnectedCallback() {}
  }

  const el = window.customElements.get("sroom-list")
  if (el) {} else {
    window.customElements.define("sroom-list", Room_);
  }
}


  //