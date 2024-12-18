import { LitElement, html, css } from 'lit';
import resetCSS from '../../../resetCSS';

export class CustomerService extends LitElement {
  static get styles() {
    return [
      resetCSS,
      css`
        .service__title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .service__contact {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .service__contact-number {
          font-size: 28px;
          font-weight: 800;
        }

        .service__contact-hours {
          color: #666;
        }

        .service__inquiry-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .service-inquiry {
          overflow: hidden;
        }

        .service-inquiry__wrapper {
          display: flex;
          gap: 16px;
          border: none;
        }

        .service-inquiry__button {
          display: flex;
          width: 140px;
          height: 40px;
          padding: 4px;
          justify-content: center;
          align-items: center;
          gap: 4px;
          border: 1px solid var(--gray-200, #c4c4c4);
          background: transparent;
        }

        .service-inquiry__button:hover {
          background-color: #f0f0f0;
        }

        .service-inquiry__content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .service-inquiry__time,
        .service-inquiry__description {
          display: block;
          color: #666;
          font-size: 14px;
          line-height: 1.5;
        }

        .service-inquiry__time + .service-inquiry__time,
        .service-inquiry__description + .service-inquiry__description {
          margin-top: 8px;
        }

        /* Email Area */
        .service__email {
          margin-top: 24px;
        }

        .service__email-item {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #666;
        }

        .service__email-item + .service__email-item {
          margin-top: 8px;
        }

        .service__email-label {
          min-width: 140px;
        }

        .service__email-link {
          color: #5f0080;
          text-decoration: none;
        }

        .service__email-link:hover {
          text-decoration: underline;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="footer__service">
        <article class="service">
          <h2 class="service__title">고객행복센터</h2>

          <div class="service__contact">
            <strong class="service__contact-number">1644-1107</strong>
            <time class="service__contact-hours"
              >월~토요일 오전 7시 - 오후 6시</time
            >
          </div>

          <div class="service__inquiry-container">
            <article class="service-inquiry">
              <div class="service-inquiry__wrapper">
                <button class="service-inquiry__button" type="button">
                  카카오톡 문의
                </button>
                <div class="service-inquiry__content">
                  <time class="service-inquiry__time"
                    >월~토요일 | 오전 7시 - 오후 6시</time
                  >
                  <time class="service-inquiry__time"
                    >일/공휴일 | 오전 7시 - 오후 1시</time
                  >
                </div>
              </div>
            </article>
            <article class="service-inquiry">
              <div class="service-inquiry__wrapper">
                <button class="service-inquiry__button" type="button">
                  카카오톡 문의
                </button>
                <div class="service-inquiry__content">
                  <time class="service-inquiry__time"
                    >월~토요일 | 오전 7시 - 오후 6시</time
                  >
                  <time class="service-inquiry__time"
                    >일/공휴일 | 오전 7시 - 오후 1시</time
                  >
                </div>
              </div>
            </article>
            <article class="service-inquiry">
              <div class="service-inquiry__wrapper">
                <button class="service-inquiry__button" type="button">
                  카카오톡 문의
                </button>
                <div class="service-inquiry__content">
                  <time class="service-inquiry__time"
                    >월~토요일 | 오전 7시 - 오후 6시</time
                  >
                  <time class="service-inquiry__time"
                    >일/공휴일 | 오전 7시 - 오후 1시</time
                  >
                </div>
              </div>
            </article>
          </div>

          <div class="service__email">
            <div class="service__email-item">
              <span class="service__email-label">비회원 문의 :</span>
              <a href="mailto:help@kurlycorp.com" class="service__email-link">
                help@kurlycorp.com
              </a>
            </div>
            <div class="service__email-item">
              <span class="service__email-label">비회원 대량주문 문의 :</span>
              <a href="mailto:help@kurlycorp.com" class="service__email-link">
                help@kurlycorp.com
              </a>
            </div>
          </div>
        </article>
      </div>
    `;
  }
}

customElements.define('customer-service', CustomerService);
