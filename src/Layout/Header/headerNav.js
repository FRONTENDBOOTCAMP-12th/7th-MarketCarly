import { LitElement, html, css } from 'lit';

export class HeaderNav extends LitElement {
  render() {
    return html`
      <nav class="header-nav">
        <!-- nav 내용 -->
      </nav>
    `;
  }
}

customElements.define('header-nav', HeaderNav);
