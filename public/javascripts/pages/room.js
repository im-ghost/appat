(()=> {
  const btn = document.querySelector("#send")
  let {
    value: room
  } = document.querySelector("#room")
  let {
    value: user
  } = document.querySelector("#user")
  room = JSON.parse(room)
  user = JSON.parse(user)
  const send = (e)=> {

    const {
      value
    } = document.querySelector("#message")
    const msg = {
      text: value,
      sender: user,
      time: new Date()
    }
    let all = room.messages
    all.push(msg)
    socket.emit("send message", room)

    let df = document.querySelector("#room-msgs")
    df.messages = all;
    df.setAttribute("messages", JSON.stringify(all))
    df.e = "jss"
    console.log(df)
  }
  btn.addEventListener("click", send)



  //
})();

const template = document.createElement("template")
template.innerHTML = `

<link rel="stylesheet" href="/stylesheets/output.css"/>
<div id="list"></div>
`


class MsgList extends HTMLElement {
  static get observedAttributes() {
    return ["messages"]
  }
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
  }
  get messages() {
    return JSON.parse(this.getAttribute("messages"))

  }
  render() {
    const dom = this.shadowRoot;
    const sel = (el) => {
      return dom.querySelector(el)
    }
    console.log("rendered ")
    sel("#list").innerHTML = ""
    this.messages.map((msg)=> {

      let div = document.createElement("div")
      div.innerHTML = `
      <h1>${msg.text}</h1>
      `
      sel("#list").appendChild(div)
    })
  }

  connectedCallback() {
    this.render();
  }
  disconnectedCallback() {}
  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }
}


const el = window.customElements.get("room-msgs")
if (el) {
  console.log(el)
} else {
  window.customElements.define("room-msgs", MsgList);
}