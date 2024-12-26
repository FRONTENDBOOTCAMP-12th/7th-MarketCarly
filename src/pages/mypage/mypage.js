import { LitElement, html } from 'lit';
import '/src/components/Mypage/FormGroup.js';
import resetCSS from '/src/styles/reset.css?inline';
import style from '/src/pages/mypage/mypage.css?inline';

class MyPage extends LitElement {
  static properties = {
    value: { type: String },
  };

  formGroupList = [
    {
      type: 'text',
      id: 'user-id',
      label: '아이디',
      value: this.value,
    },
    {
      type: 'password',
      id: 'user-pw',
      label: '현재 비밀번호',
    },
    {
      type: 'password',
      id: 'user-pw-new',
      label: '새 비밀번호',
      errorMessage: '특수문자 포함 최소 6자~최대 16자',
      errorId: 'pw-error',
    },
    {
      type: 'password',
      id: 'user-pwCheck-new',
      label: '새 비밀번호 확인',
      errorMessage: '동일한 비밀번호를 입력해주세요',
      errorId: 'pw-check',
    },
    {
      type: 'text',
      id: 'user-name',
      label: '이름',
      value: this.value,
    },
    {
      type: 'email',
      id: 'user-email',
      label: '이메일',
      button: '중복확인',
      buttonClass: 'mypage__button--check-email',
      errorMessage: '이메일 형식으로 입력해주세요',
      errorId: 'email-error',
      value: this.value,
    },
    {
      type: 'text',
      id: 'user-address',
      label: '주소',
      button: '주소 변경',
      buttonClass: 'mypage__button--address-search',
      value: this.value,
    },
    {
      type: 'tel',
      id: 'user-phone',
      label: '휴대폰',
      button: '다른번호 인증',
      buttonClass: 'phone-check',
      value: this.value,
    },
  ];

  connectedCallback() {
    super.connectedCallback();
    this.getUserInfo();
  }

  getUserInfo() {
    const loginData = JSON.parse(localStorage.getItem('auth') ?? '{}');
    const { user } = loginData;

    for (let i = 0; i < this.formGroupList.length; i++) {
      if (this.formGroupList[i].id === 'user-id') {
        this.formGroupList[i].value = user.userId;
      } else if (this.formGroupList[i].id === 'user-name') {
        this.formGroupList[i].value = user.name;
      } else if (this.formGroupList[i].id === 'user-email') {
        this.formGroupList[i].value = user.email;
      } else if (this.formGroupList[i].id === 'user-address') {
        this.formGroupList[i].value = user.address;
      } else if (this.formGroupList[i].id === 'user-phone') {
        this.formGroupList[i].value = user.phone;
      }
    }
  }

  render() {
    return html`
      <style>
        ${resetCSS}
        ${style}
      </style>
      <form action="/" class="mypage" method="">
        <fieldset class="mypage__fieldset">
          <legend class="mypage__legend">개인 정보 수정</legend>

          <div class="mypage__form">
            ${this.formGroupList.map((formGroup) => {
              return html`<form-group
                type=${formGroup.type || ''}
                id=${formGroup.id || ''}
                label=${formGroup.label || ''}
                button=${formGroup.button || ''}
                buttonClass=${formGroup.buttonClass || ''}
                errorMessage=${formGroup.errorMessage || ''}
                errorId="${formGroup.errorId || ''}"
                value=${formGroup.value || ''}
              ></form-group>`;
            })}

            <div class="mypage__form-group">
              <span class="mypage__span">성별</span>
              <input
                type="radio"
                name="gender"
                id="gender-male"
                class="mypage__radio"
                value="male"
              />
              <label for="gender-male" class="mypage__radio-label">남자</label>
              <input
                type="radio"
                name="gender"
                id="gender-female"
                class="mypage__radio"
                value="female"
              />
              <label for="gender-female" class="mypage__radio-label"
                >여자</label
              >
              <input
                type="radio"
                name="gender"
                id="gender-none"
                class="mypage__radio"
                value="none"
                checked
                aria-checked="true"
              />
              <label for="gender-none" class="myapge__radio-label"
                >선택 안함</label
              >
            </div>

            <div class="mypage__form-group">
              <span class="mypage__span">생년월일</span>
              <div class="mypage__birthday-wrapper">
                <div class="mypage__birthday">
                  <input
                    type="number"
                    id="birthday-year"
                    name="birthday-year"
                    class="mypage__input mypage__input--birthday"
                    placeholder="yyyy"
                  />
                  <span class="mypage__birthday-separator" aria-hidden="true"
                    >/</span
                  >
                  <input
                    type="number"
                    id="birthday-month"
                    name="birthday-month"
                    class="mypage__input mypage__input--birthday"
                    placeholder="mm"
                  />
                  <span class="mypage__birthday-separator" aria-hidden="true"
                    >/</span
                  >
                  <input
                    type="number"
                    id="birthday-day"
                    name="birthday-day"
                    class="mypage__input mypage__input--birthday"
                    placeholder="dd"
                  />
                </div>
              </div>
            </div>
          </div>
        </fieldset>

        <div class="mypage__button-wrapper">
          <button type="button" class="mypage__button mypage__button--quit">
            탈퇴하기
          </button>
          <button type="submit" class="mypage__button mypage__button--update">
            회원정보수정
          </button>
        </div>
      </form>
    `;
  }
}

customElements.define('my-page', MyPage);
