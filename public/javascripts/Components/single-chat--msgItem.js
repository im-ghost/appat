const singleMsg = () => {
  const template = document.createElement("template")
  template.innerHTML = `
  <style>
  </style>
  <div>
  <div id="msg"></div>
  <div id="time"></div>
  </div>

  `


  class SingleChatMsgItem extends HTMLElement {
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
      this.shadowRoot.querySelector("#msg").innerHTML = `${this.getAttribute("text")}`
      this.shadowRoot.querySelector("#time").innerHTML = `${this.getAttribute("time")}`
    }
    connectedCallback() {
    }
    disconnectedCallback() {}
  }


  window.customElements.define("chat-msg", SingleChatMsgItem);
}
export default singleMsg