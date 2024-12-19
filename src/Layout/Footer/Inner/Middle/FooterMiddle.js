import { LitElement, html, css } from 'lit';

export class FooterMiddle extends LitElement {
  static get styles() {
    return css`
      .middle {
        display: flex;
        gap: 16px;
        padding: 32px 0 24px 0;
      }

      .middle__section {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .middle__logo {
        width: 34px;
        height: 34px;
      }

      .middle__logo--tosspayments {
        width: 102px;
        height: 32px;
      }

      .middle__text {
        color: rgb(76, 76, 76);
        font-size: 12px;
        line-height: 18px;
      }
    `;
  }

  render() {
    return html`
      <div class="middle">
        <div class="middle__section">
          <img
            src="/assets/icons/ISMS.svg"
            alt="ISMS 로고"
            class="middle__logo"
          />
          <span class="middle__text"
            >[인증범위] 마켓칼리 쇼핑몰 서비스 개발 운영 (심사받지 않은 물리적
            인프라 제외) [유효기간] 2022.01.19 ~ 2025.01.18</span
          >
        </div>

        <div class="middle__section">
          <img
            src="/assets/icons/privacy.svg"
            alt="개인정보보호 로고"
            class="middle__logo"
          />
          <span class="middle__text"
            >개인정보보호 우수 웹사이트 개인정보처리시스템 인증 (ePRIVACY
            PLUS)</span
          >
        </div>

        <div class="middle__section">
          <img
            src="/assets/icons/logo_tosspayments.png"
            alt="토스페이먼츠 로고"
            class="middle__logo middle__logo--tosspayments"
          />
          <span class="middle__text"
            >토스페이먼츠 구매안전(에스크로) 서비스를 이용하실 수
            있습니다.</span
          >
        </div>

        <div class="middle__section">
          <img
            src="/assets/icons/wooribank.svg"
            alt="우리은행 로고"
            class="middle__logo"
          />
          <span class="middle__text"
            >고객님이 현금으로 결제한 금액에 대해 우리은행과 채무지급보증 계약을
            체결하여 안전거래를 보장하고 있습니다.</span
          >
        </div>
      </div>
    `;
  }
}

customElements.define('footer-middle', FooterMiddle);
