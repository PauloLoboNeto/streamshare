if (typeof window !== "undefined") {
  class SsButton extends HTMLElement {
    private styled = false;

    constructor() {
      super();

      this.addEventListener("click", () => {
        const form = this.closest("form");
        if (form) {
          form.requestSubmit();
        }
      });

      const observer = new MutationObserver(() => this.updateContent());
      observer.observe(this, { attributes: true });
    }

    connectedCallback() {
      const texto = this.getAttribute("text");
        if (texto) {
            this.setAttribute("label", texto);
        }
      if (!this.styled) {
        this.style.cssText = `
          margin-top: 32px;
          background: linear-gradient(to right, #143dc3, #a377fb);
          color: white;
          padding: 12px 16px;
          border: none;
          border-radius: 28px;
          cursor: pointer;
          font-weight: bold;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s ease;
        `;
        this.styled = true;
      }

      this.updateContent();
    }

    updateContent() {
      this.innerHTML = "";

      if (this.getAttribute("loading") === "true") {
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
        this.textContent = this.getAttribute("label");
      }
    }
  }

  if (!customElements.get("ss-button")) {
    customElements.define("ss-button", SsButton);
  }
}
