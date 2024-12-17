import { LitElement, html } from 'lit';
import '/src/components/Register/FormGroup.js';
import '/src/components/Register/AgreementSection.js';
import resetCSS from '/src/styles/reset.css?inline';
import style from '/src/pages/register/register.css?inline';

class Register extends LitElement {
  static properties = {
    showInviterInput: { type: Boolean },
    isFormValid: { type: Boolean },
    isAgreementValid: { type: Boolean },
    isIdValid: { type: Boolean },
    isPwValid: { type: Boolean },
    isEmailValid: { type: Boolean },
  };

  constructor() {
    super();
    this.showInviterInput = false;
    this.isFormValid = false;
    this.isAgreementValid = false;
    this.isIdValid = false;
    this.isPwValid = false;
    this.isEmailValid = false;
  }

  formGroupList = [
    {
      type: 'text',
      id: 'user-id',
      label: '아이디',
      placeholder: '아이디를 입력하세요',
      button: '중복확인',
      buttonClass: 'register__button--check-id',
      errorMessage: '6자 이상 16자 이하의 영문과 숫자를 조합',
      errorId: 'id-error',
    },
    {
      type: 'password',
      id: 'user-pw',
      label: '비밀번호',
      placeholder: '비밀번호를 입력해주세요',
      errorMessage: '특수문자 포함 최소 6자~최대 16자',
      errorId: 'pw-error',
    },
    {
      type: 'password',
      id: 'user-pw-check',
      label: '비밀번호 확인',
      placeholder: '비밀번호를 한번 더 입력해주세요',
      errorMessage: '동일한 비밀번호를 입력해주세요',
      errorId: 'pw-check',
    },
    {
      type: 'text',
      id: 'user-name',
      label: '이름',
      placeholder: '이름을 입력해주세요',
    },
    {
      type: 'text',
      id: 'user-email',
      label: '이메일',
      placeholder: '이메일을 입력하세요',
      button: '중복확인',
      buttonClass: 'register__button--check-email',
      errorMessage: '이메일 형식으로 입력해주세요',
      errorId: 'email-error',
    },
    {
      type: 'tel',
      id: 'user-phone',
      label: '휴대폰',
      placeholder: '숫자만 입력해주세요',
      button: '인증번호 받기',
      buttonClass: 'register__button--phone-check',
    },
    {
      label: '주소',
      button: '주소 검색',
      buttonClass: 'register__button--address-search',
    },
  ];

  handleInputChange() {
    const formGroups = this.shadowRoot.querySelectorAll('form-group');
    const inputs = [];

    for (let i = 0; i < formGroups.length - 1; i++) {
      const input = formGroups[i].shadowRoot.querySelector('input');
      inputs.push(input);
    }

    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i].value) {
        this.isFormValid = false;
      } else {
        this.isFormValid = true;
      }
    }
  }

  handleValidation(e) {
    const { isIdValid, isPwValid, isEmailValid } = e.detail;
    const input = e.target.shadowRoot.querySelector('input');
    if (input.id === 'user-id') {
      this.isIdValid = isIdValid;
    } else if (input.id === 'user-pw') {
      this.isPwValid = isPwValid;
    } else if (input.id === 'user-email') {
      this.isEmailValid = isEmailValid;
    }
  }

  handleMoreInfo(e) {
    if (e.target.id === 'more-info-inviter') {
      this.showInviterInput = true;
    }
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

  render() {
    return html` <style>
        ${resetCSS}
        ${style}
      </style>
      <form action="/" class="register" method="">
        <fieldset class="register__fieldset">
          <legend class="register__legend">회원가입</legend>
          <p class="register__required-info">필수입력사항</p>

          <div class="register__form">
          ${this.formGroupList.map((group) => {
            return html`
              <form-group
                .type=${group.type || ''}
                .id=${group.id || ''}
                .label=${group.label || ''}
                .placeholder=${group.placeholder || ''}
                .button=${group.button || ''}
                .buttonClass=${group.buttonClass || ''}
                .errorMessage=${group.errorMessage || ''}
                .errorId=${group.errorId || ''}
                @input=${this.handleInputChange}
                @validation-updated=${this.handleValidation}
              ></form-group>
            `;
          })}

        <div class="register__form-group">
          <span class="register__span">성별</span>
          <input
            type="radio"
            name="gender"
            id="gender-male"
            class="register__radio"
            value="male"
          />
          <label for="gender-male" class="register__radio-label"
            >남자</label
          >
          <input
            type="radio"
            name="gender"
            id="gender-female"
            class="register__radio"
            value="female"
          />
          <label for="gender-female" class="register__radio-label"
            >여자</label
          >
          <input
            type="radio"
            name="gender"
            id="gender-none"
            class="register__radio"
            value="none"
            checked
            aria-checked="true"
          />
          <label for="gender-none" class="register__radio-label"
            >선택 안함</label
          >
        </div>

        <div class="register__form-group">
          <span class="register__span">생년월일</span>
          <div class="register__birthday-wrapper">
            <div class="register__birthday">
              <input
                type="number"
                id="birthday-year"
                name="birthday-year"
                class="register__input register__input--birthday"
                placeholder="yyyy"
              />
              <span class="register__birthday-separator"></span>
              <input
                type="number"
                id="birthday-month"
                name="birthday-month"
                class="register__input register__input--birthday"
                placeholder="mm"
              />
              <span class="register__birthday-separator"></span>
              <input
                type="number"
                id="birthday-day"
                name="birthday-day"
                class="register__input register__input--birthday"
                placeholder="dd"
              />
            </div>
          </div>
        </div>

        <div class="register__form-group">
          <span class="register__span">추가입력 사항</span>
          <input
            type="radio"
            name="more-info"
            id="more-info-inviter"
            class="register__radio"
            value="친구초대"
            @change=${this.handleMoreInfo}
          />
          <label for="more-info-inviter" class="register__radio-label"
            >친구초대 추천인 아이디</label
          >
          <input
            type="radio"
            name="more-info"
            id="more-info-event"
            class="register__radio"
            value="참여이벤트명"
            @change=${this.handleMoreInfo}
          />
          <label for="more-info-event" class="register__radio-label"
            >참여 이벤트명</label
          >

          ${
            this.showInviterInput
              ? html` <div class="register__inviter">
                  <label
                    for="more-info-inviter-id"
                    class="register__label--none sr-only"
                    >추천인 아이디</label
                  >
                  <input
                    type="text"
                    name="more-info"
                    id="more-info-inviter-id"
                    placeholder="추천인 아이디 입력"
                    class="register__input"
                  />
                  <button
                    type="button"
                    class="register__button register__button--inviter"
                  >
                    아이디 확인
                  </button>
                </div>`
              : ''
          }
        </div>
      </div>
    </div>
        </fieldset>

        <agreement-section @agreement-change=${
          this.handleAgreementChange
        }></agreement-section>

        <button type="submit" class="register__submit" ?disabled="${!(
          this.isFormValid &&
          this.isAgreementValid &&
          this.isIdValid &&
          this.isPwValid &&
          this.isEmailValid
        )}">가입하기</button>
      </form>`;
  }
}

customElements.define('register-form', Register);
