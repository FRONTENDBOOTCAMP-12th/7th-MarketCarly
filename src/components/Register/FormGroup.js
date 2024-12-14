import { LitElement, html } from 'lit';
import style from '/src/components/Register/FormGroup.css?inline';

class FormGroup extends LitElement {
  static properties = {
    type: { type: String },
    id: { type: String },
    label: { type: String },
    placeholder: { type: String },
    button: { type: String },
    buttonClass: { type: String },
    errorMessage: { type: String },
    errorId: { type: String },
    showAuthInput: { type: Boolean },
  };

  constructor() {
    super();
    this.showAuthInput = false;
  }

  idValidation() {
    const idInput = this.shadowRoot.querySelector('#user-id');
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,16}$/;
    const isValid = pwRegex.test(idInput.value);
    const error = this.shadowRoot.querySelector('#id-error');

    if (!isValid) {
      error.classList.add('is--valid');
    } else {
      error.classList.remove('is--valid');
    }
  }

  pwValidation() {
    const pwInput = this.shadowRoot.querySelector('#user-pw');
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*?-_=+]).{6,16}$/;
    const isValid = pwRegex.test(pwInput.value);
    const error = this.shadowRoot.querySelector('#pw-error');

    if (!isValid) {
      error.classList.add('is--valid');
    } else {
      error.classList.remove('is--valid');
    }
  }

  pwCheck() {
    const childNode = this.parentElement.children[1];
    const pwCheckInput = this.shadowRoot.querySelector('#user-pw-check');
    const pwInput = childNode.shadowRoot.querySelector('#user-pw');
    const error = this.shadowRoot.querySelector('#pw-check');

    if (pwCheckInput.value !== pwInput.value) {
      error.classList.add('is--valid');
    } else {
      error.classList.remove('is--valid');
    }
  }

  emailValidation() {
    const emailInput = this.shadowRoot.querySelector('#user-email');
    const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailRegex.test(emailInput.value);
    const error = this.shadowRoot.querySelector('#email-error');

    if (!isValid) {
      error.classList.add('is--valid');
    } else {
      error.classList.remove('is--valid');
    }
  }

  showErrorMessage() {
    if (this.id === 'user-email') {
      this.emailValidation();
    } else if (this.id === 'user-pw') {
      this.pwValidation();
    } else if (this.id === 'user-id') {
      this.idValidation();
    } else if (this.id === 'user-pw-check') {
      this.pwCheck();
    }
  }

  handleButtonClick() {
    const input = this.shadowRoot.querySelector(`#${this.id}`);
    const value = Number(input.value);

    if (this.id === 'user-phone' && input && value) {
      this.showAuthInput = true;
    } else {
      alert('휴대폰 번호를 입력해주세요');
    }
  }

  render() {
    return html`
      <style>
        ${style}
      </style>
      <div class="register__form-group">
        <label
          for="${this.id}"
          class="register__label register__label--required"
          >${this.label}</label
        >
        ${this.type
          ? html`<input
              type="${this.type}"
              id="${this.id}"
              name="${this.id}"
              class="register__input"
              placeholder="${this.placeholder}"
              required
              aria-required="true"
              aria-described=${this.errorMessage ? `${this.errorId}` : ''}
              @input=${this.showErrorMessage}
            />`
          : ''}
        ${this.button
          ? html`<button
              type="button"
              class="register__button ${this.buttonClass}"
              @click=${this.handleButtonClick}
            >
              ${this.button}
            </button>`
          : ''}
        ${this.errorMessage
          ? html`<span class="register__error-message" id=${this.errorId}
              >${this.errorMessage}</span
            >`
          : ''}
      </div>

      ${this.showAuthInput
        ? html`<div class="register__auth">
            <label for="auth-number" class="register__label--none sr-only"
              >인증번호 확인</label
            >
            <input
              type="number"
              name="auth-number"
              id="auth-number"
              class="register__input"
              placeholder="인증번호를 입력해주세요"
            />
            <button
              type="button"
              class="register__button register__button--check-auth"
            >
              인증번호 확인
            </button>
          </div>`
        : ''}
    `;
  }
}

customElements.define('form-group', FormGroup);
