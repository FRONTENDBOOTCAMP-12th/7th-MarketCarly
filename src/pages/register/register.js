import { LitElement, html } from 'lit';
import '/src/components/Register/AgreementSection.js';
import '/src/components/Register/FormField.js';
import resetCSS from '/src/styles/reset.css?inline';
import style from '/src/pages/register/register.css?inline';

class Register extends LitElement {
  static properties = {
    isFormValid: { type: Boolean },
    isAgreementValid: { type: Boolean },
    isIdValid: { type: Boolean },
    isPwValid: { type: Boolean },
    isEmailValid: { type: Boolean },
  };

  constructor() {
    super();
    this.isFormValid = false;
    this.isAgreementValid = false;
    this.isIdValid = false;
    this.isPwValid = false;
    this.isEmailValid = false;
  }

  handleAgreementChange(e) {
    const { value, checked } = e.detail;

    if (value === 'agree-all' && checked) {
      this.isAgreementValid = true;
    } else if (value !== 'agree-all') {
      const requiredValues = ['ToS', 'personal-info', 'age'];
      this.agreementStates = this.agreementStates || {};
      this.agreementStates[value] = checked;

      this.isAgreementValid = requiredValues.every(
        (val) => this.agreementStates[val] === true
      );
    } else {
      this.isAgreementValid = false;
    }
  }

  handleFormValidationChange(e) {
    this.isFormValid = e.target.isFormValid;
  }

  handleInputValidationChange(e) {
    this.isIdValid = e.target.isIdValid;
    this.isPwValid = e.target.isPwValid;
    this.isEmailValid = e.target.isEmailValid;
  }

  render() {
    return html` <style>
        ${resetCSS}
        ${style}
      </style>
      <form action="/" class="register" method="">
        <form-field
          @form-validation=${this.handleFormValidationChange}
          @input-validation=${this.handleInputValidationChange}
        ></form-field>
        <agreement-section
          @agreement-change=${this.handleAgreementChange}
        ></agreement-section>

        <button
          type="submit"
          class="register__submit"
          ?disabled="${!(
            this.isFormValid &&
            this.isAgreementValid &&
            this.isIdValid &&
            this.isPwValid &&
            this.isEmailValid
          )}"
        >
          가입하기
        </button>
      </form>`;
  }
}

customElements.define('register-form', Register);
