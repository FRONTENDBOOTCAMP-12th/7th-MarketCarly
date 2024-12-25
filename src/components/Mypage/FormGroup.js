import { LitElement, html } from 'lit';
import style from '/src/components/Mypage/FormGroup.css?inline';
import resetCSS from '/src/styles/reset.css?inline';

class FormGroup extends LitElement {
  static properties = {
    type: { type: String },
    id: { type: String },
    label: { type: String },
    button: { type: String },
    errorMessage: { type: String },
    buttonClass: { type: String },
    errorId: { type: String },
    showDetailAddress: { type: Boolean },
    value: { type: String },
    isValid: { type: Object },
  };

  constructor() {
    super();
    this.showDetailAddress = false;
    this.isValid = {
      isPwValid: false,
      isEmailValid: false,
    };
  }

  pwValidation() {
    const pwInput = this.shadowRoot.querySelector('#user-pw-new');
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*?-_=+]).{6,16}$/;
    this.isValid.isPwValid = pwRegex.test(pwInput.value);
    const error = this.shadowRoot.querySelector('#pw-error');

    if (!this.isValid.isPwValid) {
      error.classList.add('is--valid');
    } else {
      error.classList.remove('is--valid');
    }
  }

  pwCheck() {
    const childNode = this.parentElement.children[2];
    const pwCheckInput = this.shadowRoot.querySelector('#user-pwCheck-new');
    const pwInput = childNode.shadowRoot.querySelector('#user-pw-new');
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
  }

  showErrorMessage() {
    if (this.id === 'user-email') {
      this.emailValidation();
    } else if (this.id === 'user-pw-new') {
      this.pwValidation();
    } else if (this.id === 'user-pwCheck-new') {
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
    const addressButton = this.shadowRoot.querySelector(
      '.mypage__button--address-search'
    );
    const emailCheckButton = this.shadowRoot.querySelector(
      '.mypage__button--check-email'
    );

    if (addressButton) {
      this.kakaoAddressApi();
    }
  }

  render() {
    return html`
      <style>
        ${resetCSS}
          ${style}
      </style>
      <div class="mypage__form-group">
        <label for=${this.id} class="mypage__label"> ${this.label} </label>
        <input
          type=${this.type}
          name=${this.id}
          id=${this.id}
          class="mypage__input"
          value=${this.value}
          @input=${this.showErrorMessage}
          ?readonly=${this.id === 'user-id' || this.id === 'user-phone'}
        />

        ${this.button
          ? html`<button
              type="button"
              class="mypage__button ${this.buttonClass}"
              @click=${this.handleButtonClick}
            >
              ${this.button}
            </button>`
          : ''}
        ${this.errorMessage
          ? html`<span class="mypage__error-message" id=${this.errorId}
              >${this.errorMessage}</span
            >`
          : ''}
        ${this.showDetailAddress
          ? html`
              <div class="mypage__address">
                <label
                  for="user-detail-address"
                  class="mypage__label--none sr-only"
                  >상세 주소</label
                >
                <input
                  type="text"
                  id="user-detail-address"
                  name="user-detail-address"
                  class="mypage__input"
                  placeholder="상세 주소를 입력하세요"
                />
              </div>
            `
          : ''}
      </div>
    `;
  }
}

customElements.define('form-group', FormGroup);
