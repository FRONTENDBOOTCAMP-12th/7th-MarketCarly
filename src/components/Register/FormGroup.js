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
    isValid: { type: Object },
    showDetailAddress: { type: Boolean },
  };

  constructor() {
    super();
    this.showAuthInput = false;
    this.isValid = {
      isIdValid: false,
      isPwValid: false,
      isEmailValid: false,
    };
    this.showDetailAddress = false;
  }

  dispatchValidationEvent() {
    this.dispatchEvent(
      new CustomEvent('validation-updated', {
        detail: {
          isIdValid: this.isValid.isIdValid,
          isPwValid: this.isValid.isPwValid,
          isEmailValid: this.isValid.isEmailValid,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  idValidation() {
    const idInput = this.shadowRoot.querySelector('#user-id');
    const idRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,16}$/;
    this.isValid.isIdValid = idRegex.test(idInput.value);
    const error = this.shadowRoot.querySelector('#id-error');

    if (!this.isValid.isIdValid) {
      error.classList.add('is--valid');
    } else {
      error.classList.remove('is--valid');
    }

    this.dispatchValidationEvent();
  }

  pwValidation() {
    const pwInput = this.shadowRoot.querySelector('#user-pw');
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*?-_=+]).{6,16}$/;
    this.isValid.isPwValid = pwRegex.test(pwInput.value);
    const error = this.shadowRoot.querySelector('#pw-error');

    if (!this.isValid.isPwValid) {
      error.classList.add('is--valid');
    } else {
      error.classList.remove('is--valid');
    }

    this.dispatchValidationEvent();
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
    this.isValid.isEmailValid = emailRegex.test(emailInput.value);
    const error = this.shadowRoot.querySelector('#email-error');

    if (!this.isValid.isEmailValid) {
      error.classList.add('is--valid');
    } else {
      error.classList.remove('is--valid');
    }

    this.dispatchValidationEvent();
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

  kakaoAddressApi() {
    new daum.Postcode({
      oncomplete: (data) => {
        let address = '';
        let extraInfo = '';

        if (data.userSelectedType === 'R') {
          address = data.roadAddress;
        } else {
          address = data.jibunAddress;
        }

        if (data.userSelectedType === 'R') {
          if (data.bname && /[동|로|가]$/g.test(data.bname)) {
            extraInfo += data.bname;
          }
          if (data.buildingName && data.apartment === 'Y') {
            extraInfo += extraInfo
              ? `, ${data.buildingName}`
              : data.buildingName;
          }
          if (extraInfo) {
            extraInfo = `(${extraInfo})`;
          }
        }
        const addressInput = this.shadowRoot.querySelector('#user-address');
        addressInput.value = address + ' ' + extraInfo;

        this.showDetailAddress = true;
      },
    }).open();
  }

  handleButtonClick() {
    const phoneButton = this.shadowRoot.querySelector(
      '.register__button--phone-check'
    );
    const addressButton = this.shadowRoot.querySelector(
      '.register__button--address-search'
    );

    if (phoneButton) {
      const phoneInput = this.shadowRoot.querySelector('#user-phone');
      const phoneNumber = Number(phoneInput.value);

      if (phoneNumber) {
        this.showAuthInput = true;
      } else {
        console.log('input error');
      }
    } else if (addressButton) {
      this.kakaoAddressApi();
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
      ${this.showDetailAddress
        ? html`
            <div class="register__address">
              <label
                for="user-detail-address"
                class="register__label--none sr-only"
                >상세 주소</label
              >
              <input
                type="text"
                id="user-detail-address"
                name="user-detail-address"
                class="register__input"
                placeholder="상세 주소를 입력하세요"
              />
            </div>
          `
        : ''}
    `;
  }
}

customElements.define('form-group', FormGroup);
