import { LitElement, html, css } from 'lit';
import './Inner/index.js';
import './Bottom/FooterBottom.js';

export class Footer extends LitElement {
  static get styles() {
    return css``;
  }

  render() {
    return html`
      <footer>
        <footer-inner></footer-inner>
        <footer-bottom></footer-bottom>
      </footer>
    `;
  }
}

customElements.define('c-footer', Footer);
