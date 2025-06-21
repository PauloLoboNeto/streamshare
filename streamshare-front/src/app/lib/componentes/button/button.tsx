/* eslint-disable @typescript-eslint/no-explicit-any */
if (typeof window !== "undefined") {
  class SsButton extends HTMLElement {
    constructor() {
      super();
      // this.setAttribute("class", "ss-button");
      this.addEventListener("click", () => {
        const form = this.closest("form");
        if (form) {
          form.requestSubmit();
        }
      });

      const observer = new MutationObserver(() => this.updateContent());
      observer.observe(this, { attributes: true });
    }

    updateContent() {
      this.innerHTML = "";
      console.log(this.getAttribute("loading"))
      if (this.getAttribute("loading") == "true") {
        const spinner = document.createElement("div");
        spinner.style.cssText = `
          width: 16px;
          height: 16px;
          border: 2px solid white;
          border-top: 2px solid transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: auto;
        `;
        this.appendChild(spinner);

        const style = document.createElement("style");
        style.textContent = `
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `;
        this.appendChild(style);
      } else {
        this.textContent =
          this.getAttribute("label");
      }
    }
  }

  if (typeof window !== "undefined" && !customElements.get("ss-button")) {
    customElements.define("ss-button", SsButton);
  }
}
