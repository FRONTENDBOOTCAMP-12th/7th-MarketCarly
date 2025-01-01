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
        max-width: 1050px;
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

      @media (max-width: 768px) {
        .inner-top {
          flex-direction: column;
          padding: 20px;
        }

        customer-service,
        footer-about {
          width: 100%;
          padding: 0;
        }

        footer-about {
          position: relative;
          margin-top: 32px;
          padding-top: 32px;
        }

        footer-about::before {
          content: '';
          position: absolute;
          background-color: rgb(233, 233, 233);
          width: 50%;
          height: 1px;
          top: 0;
        }
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
