///


const singleMsg = () => {
  const template = document.createElement("template")
  template.innerHTML = `
  <script src="/javascripts/alphine.js"></script>


  <link rel="stylesheet" href="/stylesheets/output.css"/>

  <div class="container p-4 m-2 relative rounded shadow hover:shadow-3xl border-2 border-dotted w-32 dark:bg-blue-90 bg-blue-300 overflow-scroll">
  <h3 id="msg"></h3>
  <div id="time"></div>
  <p x-text="true"></p>
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
      document.addEventListener("alpine:init", ()=> {
        Alpine.initTree(this.shadowRoot)
        alert("yes")
      })
    }
    disconnectedCallback() {}
  }


  window.customElements.define("chat-msg", SingleChatMsgItem);
}
export default singleMsg