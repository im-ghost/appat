//
//
//
const MemoriesPage = ()=> {
  const {
    value: user
  } = document.querySelector("#user");

  const {
    value: memories
  } = document.querySelector("#memories");
}
  const template = document.createElement("template")

  template.innerHTML = `

  <link rel="stylesheet" href="/stylesheets/output.css"/>
  <div x-data="memorylist" class="rounded-3xl shadow-2xl w-full border-2 p-4 m-4 text-4xl">
  <header class="flex">
  <img :src="img" class="rounded-[50%] h-32 w-32"/>
  <div class="">
  <h1 x-text="name"></h1>

  <p x-text="date"></p>
  </div>
  </header>
  <main>
  <p x-text="body"></p>
  </main>
  <div class="flex justify-evenly">
  <span id="like" class="rounded-lg shadow p-4 flex align-center text-center justify-center w-1/4">👍</span>
  <span id="share" class="rounded-lg shadow p-4 flex align-center text-center justify-center w-1/4">Share</span>
  <span id="comment" class="rounded-lg shadow p-4 flex align-center text-center justify-center w-1/4">💬</span>
  </div>



  </div>
  `

  class List extends HTMLElement {
    constructor() {
      super()

      this.attachShadow({
        mode: "open"
      });
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.memory = JSON.parse(this.getAttribute("memory"))
      const {
        title,
        body,
        reactions,
        user
      } = this.memory
      const dom = this.shadowRoot;
      const sel = (el) => {
        return dom.querySelector(el)
      }

    }

    connectedCallback() {

      const addRoom = ()=> {
        window.location.replace('/memories/addMemory')
      
    }
    document.querySelector("#addm").addEventListener("click", addMemory)

    window.addEventListener("alpine:init", ()=> {

      Alpine.data('memorylist', () => ({
        init() {
          console.log(this.memory)
        },
        title: this.memory.title,
        userId: this.memory.user,
        body: this.memory.body,
        date: this.memory.date,
        id: this.memory._id,
        user: this.memory.userObj,
        img: this.memory.userObj.image,
        name: this.memory.userObj.displayName
      }))


      Alpine.initTree(this.shadowRoot)
    })
  }
}





const el = window.customElements.get("memorylist-item")
if (el) {
  console.log(el)
} else {
  window.customElements.define("memorylist-item", List);
}





document.addEventListener("DOMContentLoaded", MemoriesPage)