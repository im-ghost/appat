//
//
import singleMsg from "./single-chat--msgItem.js"




const registerList = () => {
  singleMsg()
  const template = document.createElement("template")
  template.innerHTML = `
  
  <link rel="stylesheet" href="/stylesheets/output.css"/>
  <link rel="stylesheet" href="/stylesheets/app.css"/>
  
  <div x-data="{
  name:'wodd'}" class="container overflow-scroll h-64 p-2 w-screen>
  <div id="msgs">
  <chat-msg
  text= 'dr',
  time= '22:30',
  sender= 'me'
  ></chat-msg>
  </div>
  <div id="time"></div>
  <p x-text="name">ff</p>
  </div>

  `


  class ChatMsgs extends HTMLElement {
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
    connectedCallback() {
      document.addEventListener("alpine:init", ()=> {
        Alpine.initTree(this.shadowRoot)
      })
    }
    disconnectedCallback() {}
  }


  window.customElements.define("msgs-list", ChatMsgs);
}

export default registerList