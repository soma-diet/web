const FILLED_ATTR_NAME = "filled"
const PROJECTED_ATTR_NAME = "projected"
const MAX_ATTR_NAME = "max"

function makeBar(idClass) {
  const bar = document.createElement("div");
  bar.classList.add(idClass);
  return bar;
}

function setupCss(element) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/elements/macro-bar.css";
  element.append(link);
  // this.innerHTML = `<link rel="stylesheet" href="/elements/macro-bar.css">`;
}

class MacroBar extends HTMLElement {
  #filled;
  #projected;
  #max;

  constructor() {
    super()

    this.fillBar = makeBar("fill");
    this.projectBar = makeBar("project");
  }
  
  // jaky atributy ma element
  static get observedAttributes() {
    return [FILLED_ATTR_NAME, PROJECTED_ATTR_NAME, MAX_ATTR_NAME];
  }
  
  updateProperties() {
    this.#filled = Number(this.getAttribute(FILLED_ATTR_NAME) || 0);
    this.#projected = Number(this.getAttribute(PROJECTED_ATTR_NAME) || 0);
    this.#max = Number(this.getAttribute(MAX_ATTR_NAME) || 0);
  }
  
  connectedCallback() {
    setupCss(this);
    this.append(this.fillBar, this.projectBar);

    this.updateProperties();
    this.render();
  }
  
  // javascript muze zmenit (asi se hodi pro vue?)
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.updateProperties();
      this.render();
    }
  }

  render() {
    const filledCapped = Math.min(this.#filled, this.#max); // musi byt mensi nez max
    const projectedCapped = Math.min(this.#filled + this.#projected, this.#max);

    const fillPercentage = filledCapped / this.#max * 100;
    const projectedPercentage = projectedCapped / this.#max * 100 - fillPercentage;

    this.fillBar.style.width = `${fillPercentage}%`;
    this.projectBar.style.width = `${projectedPercentage}%`;
  }
}

customElements.define("macro-bar", MacroBar);