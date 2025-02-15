import { LitElement, html, css } from 'lit';
import './HeaderTop';
import './HeaderNav';

export class Header extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        width: 100%;
      }

      header {
        background-color: white;
      }
    `;
  }

  render() {
    return html`
      <header>
        <header-top></header-top>
        <header-nav></header-nav>
      </header>
    `;
  }
}

customElements.define('c-header', Header);

export default Header;
