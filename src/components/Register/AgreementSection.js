import { LitElement, html, css } from 'lit';
import '/src/components/Register/AgreementItem.js';
import resetCSS from '/src/Layout/resetCSS.ts';

class AgreementSection extends LitElement {
  static styles = [
    resetCSS,
    css`
      /* 이용 약관 동의 */
      .register__agreement {
        border-bottom: 0.0625rem solid var(--gray--200);
        display: flex;
        flex-direction: row;
        gap: 3.125rem;
        padding-block: 1.25rem;
        color: var(--content);
        font-size: var(--text-base);
        font-weight: var(--font-regular);
        line-height: var(--line-height-semirelaxed);
      }

      .register__agreement-label {
        font-size: var(--text-base);
        font-weight: var(--font-semibold);
        line-height: var(--line-height-normal);
        width: 6.875rem;
        padding-left: 0.625rem;
      }

      .register__agreement-label::after {
        content: '*';
        color: var(--info---error);
      }

      .register__agreement-checklist {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
    `,
  ];

  render() {
    return html`
      <fieldset class="register__agreement">
        <span class="register__agreement-label">이용약관동의</span>

        <div class="register__agreement-checklist">
          <agreement-item
            value="agree-all"
            label="전체 동의합니다."
            description
          ></agreement-item>

          <agreement-item
            value="tos"
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
