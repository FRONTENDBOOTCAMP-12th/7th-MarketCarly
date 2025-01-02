import { LitElement, html, css } from 'lit';
import '/src/components/Register/AgreementItem.js';
import resetCSS from '/src/styles/reset.css?inline';
import style from '/src/components/Register/AgreementSection.css?inline';

class AgreementSection extends LitElement {
  render() {
    return html`
      <style>
        ${style}
        ${resetCSS}
      </style>
      <fieldset class="register__agreement">
        <div class="register__agreement-label-wrapper">
          <span class="register__agreement-label">이용약관동의</span
          ><span class="register__label-required" aria-label="필수 입력 요소"
            >*</span
          >
        </div>

        <div class="register__agreement-checklist">
          <agreement-item
            value="agree-all"
            label="전체 동의합니다."
            description
          ></agreement-item>

          <agreement-item
            value="ToS"
            required
            label="이용약관 동의"
            link
          ></agreement-item>

          <agreement-item
            value="personal-info"
            required
            label="개인정보 수집 및 이용 동의"
            link
          ></agreement-item>

          <agreement-item
            value="reception"
            label="무료배송, 할인쿠폰 등 혜택/정보 수신 동의"
            link
          ></agreement-item>

          <agreement-item
            value="age"
            required
            label="본인은 만 14세 이상입니다."
            link
          ></agreement-item>
        </div>
      </fieldset>
    `;
  }
}

customElements.define('agreement-section', AgreementSection);
