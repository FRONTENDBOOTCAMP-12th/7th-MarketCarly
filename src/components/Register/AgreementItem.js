import { LitElement, html } from 'lit';
import style from '/src/components/Register/AgreementItem.css?inline';
import resetCSS from '/src/styles/reset.css?inline';

class AgreementItem extends LitElement {
  static properties = {
    value: { type: String },
    required: { type: Boolean },
    label: { type: String },
    description: { type: Boolean },
    link: { type: Boolean },
  };

  constructor() {
    super();
    this.requried = false;
    this.description = false;
    this.link = false;
  }

  checkAgreeAll(e) {
    const isChecked = e.target.checked;
    const checkList = this.parentElement.children;
    const checkboxes = [];

    for (let i = 0; i < checkList.length; i++) {
      const checkInput = this.parentElement.children[
        i
      ].shadowRoot.querySelectorAll('input[type="checkbox"]');
      checkboxes.push(checkInput[0]);
    }

    if (this.value === 'agree-all') {
      checkboxes.forEach((checkbox) => {
        checkbox.checked = isChecked;
      });
    } else {
      const otherCheckboxes = checkboxes.filter(
        (checkbox) => checkbox.value !== 'agree-all'
      );

      const allChecked = otherCheckboxes.every((checkbox) => checkbox.checked);

      const agreeAllCheckbox = checkboxes.find(
        (checkbox) => checkbox.value === 'agree-all'
      );
      if (agreeAllCheckbox) {
        agreeAllCheckbox.checked = allChecked;
      }
    }

    this.dispatchEvent(
      new CustomEvent('agreement-change', {
        detail: { value: this.value, checked: e.target.checked },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <style>
        ${style}
        ${resetCSS}
      </style>
      <div
        class="register__agreement-item ${this.description
          ? 'register__agreement-all'
          : ''}"
      >
        <input
          value="${this.value}"
          type="checkbox"
          name="agreement"
          id="${this.value}"
          class="register__checkbox"
          ?required="${this.required}"
          @change=${this.checkAgreeAll}
        />
        <label for="${this.value}" class="register__checkbox-label">
          <span class="register__icon-check"></span>${this.label}${!this
            .description
            ? `${this.required ? '(필수)' : '(선택)'}`
            : ''}
        </label>
        ${this.description
          ? html`<p class="register__agreement-desc">
              선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를
              이용할 수 있습니다.
            </p>`
          : ''}
        ${this.link
          ? html`<a href="/src/pages/register/" class="register__link"
              >약관보기 ></a
            >`
          : ''}
      </div>
    `;
  }
}

customElements.define('agreement-item', AgreementItem);
