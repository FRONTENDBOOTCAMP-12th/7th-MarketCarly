import { LitElement, html, css } from 'lit';
import './CustomerService.js';
import './FooterAbout.js';

export class InnerTop extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        width: 100%;
      }

      .inner-top {
        display: flex;
        width: 1050px;
        margin: 0 auto;
        padding: 28px 0px 32px 0px;
        justify-content: space-between;
      }

      customer-service,
      footer-about {
        display: block;
      }

      customer-service {
        width: 50%;
      }

      footer-about {
        width: 50%;
      }
    `;
  }

  render() {
    return html`
      <div class="inner-top">
        <customer-service></customer-service>
        <footer-about></footer-about>
      </div>
    `;
  }
}

customElements.define('inner-top', InnerTop);
