if (typeof window !== "undefined") {
  class SsCard extends HTMLElement {
    constructor() {
      super();
    }
  }

  if (typeof window !== "undefined" && !customElements.get("ss-card")) {
    customElements.define("ss-card", SsCard);

    const style = document.createElement("style");
    style.textContent = `
    ss-card {
       display: block;
       background-color: rgb(67, 67, 67);
       width: 200px;
       height: 200px;
       border-radius: 10px;
    }
  `;
    document.head.appendChild(style);
  }
}
