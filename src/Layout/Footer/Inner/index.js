import { LitElement, html, css } from 'lit';
import './Top/index.js';
import './Middle/FooterMiddle.js';

export class FooterInner extends LitElement {
  static get styles() {
    return css`
      .inner {
        max-width: 1050px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
      }

      .divide {
        width: 100%;
        height: 1px;
        background-color: rgb(247, 247, 247);
        margin: 20px 0;
      }
    `;
  }

  render() {
    return html`
      <div class="inner">
        <inner-top></inner-top>
        <div class="divie"></div>
        <footer-middle></footer-middle>
      </div>
    `;
  }
}

customElements.define('footer-inner', FooterInner);
