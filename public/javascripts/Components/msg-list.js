//
//
import singleMsg from "./single-chat--msgItem.js"




const registerList = () => {
  singleMsg()
  const template = document.createElement("template")
  template.innerHTML = `
  <style>
  </style>
  <div x-data="{
name:'woekddddddd'}">
  <div id="msgs">
  <chat-msg
  text= 'dr',
  time= '22:30',
  sender= 'me'
  ></chat-msg>
  </div>
  <div id="time"></div>
 
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
      document.addEventListener("alpine:initialized",()=>{
    Alpine.initTree(this.shadowRoot)
})
    }
    disconnectedCallback() {
    }
  }


  window.customElements.define("msgs-list", ChatMsgs);
}

export default registerList