import { LitElement, html } from 'lit';
import '/src/components/Register/AgreementSection.js';
import '/src/components/Register/FormField.js';
import resetCSS from '/src/styles/reset.css?inline';
import style from '/src/pages/register/register.css?inline';
import pb from '/src/api/pocketbase';

class Register extends LitElement {
  static properties = {
    isFormValid: { type: Boolean },
    isAgreementValid: { type: Boolean },
    isIdValid: { type: Boolean },
    isPwValid: { type: Boolean },
    isEmailValid: { type: Boolean },
    isAuthValid: { type: Boolean },
  };

  constructor() {
    super();
    this.isFormValid = false;
    this.isAgreementValid = false;
    this.isIdValid = false;
    this.isPwValid = false;
    this.isEmailValid = false;
    this.isAuthValid = false;
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

  handleAuthValidationChange(e) {
    this.isAuthValid = e.target.isAuthValid;
  }

  extractFormData() {
    const formField = this.shadowRoot.querySelector('form-field');
    const registerField = formField.shadowRoot.querySelector(
      '.register__fieldset'
    );
    const registerForm = registerField.querySelector('.register__form');

    const fieldKey = [
      'id',
      'pw',
      'pwCheck',
      'name',
      'email',
      'phone',
      'address',
    ];
    const formData = {};

    fieldKey.forEach((key, index) => {
      const input =
        registerForm.children[index].shadowRoot.querySelector(
          '.register__input'
        ).value;

      formData[key] = input;
    });

    const addressDetail = registerForm.children[6].shadowRoot.querySelector(
      '#user-detail-address'
    ).value;

    const address = formData.address + ' ' + addressDetail;

    formData.address = address;

    const gender = registerForm.children[7].querySelector(
      `input[type='radio']:checked`
    ).value;

    formData.gender = gender;

    const birthYear =
      registerForm.children[8].querySelector('#birthday-year').value;
    const birthMonth =
      registerForm.children[8].querySelector('#birthday-month').value;
    const birthDay =
      registerForm.children[8].querySelector('#birthday-day').value;

    const birth = birthYear + '-' + birthMonth + '-' + birthDay;

    formData.birth = birth;

    return formData;
  }

  extractAgreementData() {
    const agreementSection = this.shadowRoot.querySelector('agreement-section');
    const agreementChecklist = agreementSection.shadowRoot.querySelector(
      '.register__agreement-checklist'
    );

    const fieldKey = ['agree-all', 'option1', 'option2', 'option3', 'option4'];
    const agreementData = {};

    fieldKey.forEach((key, index) => {
      const checkboxes = agreementChecklist.children[
        index
      ].shadowRoot.querySelector(`input[type='checkbox']`);

      agreementData[key] = checkboxes.checked;
    });

    return agreementData;
  }

  handleRegisterSubmit(e) {
    e.preventDefault();

    const formData = this.extractFormData();
    const agreementData = this.extractAgreementData();

    const data = {
      userId: formData.id,
      password: formData.pw,
      passwordConfirm: formData.pwCheck,
      emailVisibility: true,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      gender: formData.gender,
      birth: formData.birth,
      option1: agreementData.option1,
      option2: agreementData.option2,
      option3: agreementData.option3,
      option4: agreementData.option4,
    };

    pb.collection('users')
      .create(data)
      .then(() => {
        Swal.fire({
          title: '회원가입 완료!',
          text: '로그인 페이지로 이동합니다.',
        }).then(() => {
          location.href = '/src/pages/login/';
        });
      })
      .catch(() => {
        Swal.fire({
          title: '회원가입 실패..',
          text: '입력 정보를 확인해주세요.',
        }).then(() => {
          location.reload();
        });
      });
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
          @auth-validation=${this.handleAuthValidationChange}
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
            this.isEmailValid &&
            this.isAuthValid
          )}"
          @click=${this.handleRegisterSubmit}
        >
          가입하기
        </button>
      </form>`;
  }
}

customElements.define('register-form', Register);
