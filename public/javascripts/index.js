const template = document.createElement("template")
template.innerHTML = `
<style>
</style>
<div class='container shadow-lg mx-auto my-4 py-4 px-auto rounded border border-dotted'>dfd
<h4 id="d"></h4>
<h4 id="e">-</h4>
</div>
`
class SongListItem extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: "open"
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    let dom = this.shadowRoot;

    const sel = (el) => {
      return dom.querySelector(el)
    }
    sel("#d").innerHTML =
    `${this.getAttribute("dd")}`

    sel("#e").innerHTML +=
    `${this.innerText}`


  }
  toggle() {
    console.log("hhh")
  }
  connectedCallback() {}
  disconnectedCallback() {}
}


window.addEventListener("DOMContentLoaded", ()=> {
  setTimeout(function() {

    window.customElements.define("single-song", SongListItem);


  }, 4000);
})