if (typeof window !== "undefined") {
  class SsCard extends HTMLElement {
    constructor() {
      super();
    }
  }

  if (typeof window !== "undefined" && !customElements.get("ss-card")) {
    customElements.define("ss-card", SsCard);
  }
}
