import { LitElement, html } from 'lit';
import '/src/components/Mypage/FormGroup.js';
import resetCSS from '/src/styles/reset.css?inline';
import style from '/src/pages/mypage/mypage.css?inline';
import pb from '/src/api/pocketbase.js';
import Swal from 'sweetalert2';

class MyPage extends LitElement {
  static properties = {
    value: { type: String },
    gender: { type: String },
    birth: { type: Object },
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
      errorMessage: '현재 비밀번호를 확인해주세요',
      errorId: 'pw-error',
    },
    {
      type: 'password',
      id: 'user-pw-new',
      label: '새 비밀번호',
      errorMessage: '특수문자 포함 최소 6자~최대 16자',
      errorId: 'pw-new-error',
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

  constructor() {
    super();
    this.gender = 'none';
    this.birth = {
      year: '',
      month: '',
      day: '',
    };
  }

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

    if (user.gender) {
      this.gender = user.gender;
    }

    if (user.birth) {
      const birthArray = user.birth.split('-');
      this.birth.year = birthArray[0];
      this.birth.month = birthArray[1];
      this.birth.day = birthArray[2];
    }
  }

  extractFormData() {
    const formGroup = this.shadowRoot.querySelectorAll('form-group');
    const fieldKey = [
      'id',
      'pw',
      'newPw',
      'newPwConfirm',
      'name',
      'email',
      'address',
      'phone',
    ];
    const formGroupData = {};

    fieldKey.forEach((key, index) => {
      const inputValue =
        formGroup[index].shadowRoot.querySelector('input').value;
      formGroupData[key] = inputValue;
    });
    const addressDetail =
      formGroup[6].shadowRoot.querySelector('#user-detail-address')?.value ||
      '';
    const address = formGroupData.address + ' ' + addressDetail;
    formGroupData.address = address;

    const gender = this.shadowRoot.querySelector(
      `input[type='radio']:checked`
    ).value;
    formGroupData.gender = gender;

    const birthInput = this.shadowRoot.querySelectorAll(`input[type='number']`);
    const year = birthInput[0].value;
    const month = birthInput[1].value;
    const day = birthInput[2].value;

    const birth = `${year}-${month}-${day}`;
    formGroupData.birth = birth;

    return formGroupData;
  }

  handleUpdateLocalStorage() {
    const { record, token } = JSON.parse(
      localStorage.getItem('pocketbase_auth') ?? '{}'
    );

    localStorage.setItem(
      'auth',
      JSON.stringify({
        isAuth: !!record,
        user: record,
        token: token,
      })
    );
  }

  handleUpdate(e) {
    e.preventDefault();
    const formData = this.extractFormData();
    const auth = JSON.parse(localStorage.getItem('auth'));
    const { user } = auth;
    const recordId = user.id;

    const formGroup = this.shadowRoot.querySelectorAll('form-group');
    const userPw = formGroup[1].shadowRoot.querySelector('#user-pw').value;
    const userPwNew =
      formGroup[2].shadowRoot.querySelector('#user-pw-new').value;
    const userPwCheck =
      formGroup[3].shadowRoot.querySelector('#user-pwCheck-new').value;

    const data = {
      userId: formData.id,
      oldPassword: formData.pw,
      password: formData.newPw,
      passwordConfirm: formData.newPwConfirm,
      name: formData.name,
      email: formData.email,
      address: formData.address,
      phone: formData.phone,
      gender: formData.gender,
      birth: formData.birth,
    };

    try {
      if (userPw && userPwNew && userPwCheck) {
        pb.collection('users')
          .update(recordId, data)
          .then(() => {
            this.handleUpdateLocalStorage();

            Swal.fire({
              title: '정보가 수정되었습니다.',
              icon: 'success',
              text: '비밀번호 재확인 페이지로 이동합니다.',
            }).then(() => {
              location.href = '/src/pages/pwConfirm/';
            });
          });
      } else {
        pb.collection('users')
          .update(recordId, {
            userId: formData.id,
            name: formData.name,
            email: formData.email,
            address: formData.address,
            phone: formData.phone,
            gender: formData.gender,
            birth: formData.birth,
          })
          .then(() => {
            this.handleUpdateLocalStorage();

            Swal.fire({
              title: '정보가 수정되었습니다.',
              icon: 'success',
              text: '비밀번호 재확인 페이지로 이동합니다.',
            }).then(() => {
              location.href = '/src/pages/pwConfirm/';
            });
          });
      }
    } catch (error) {
      Swal.fire('정보 수정을 실패했습니다..');
    }
  }

  async handleQuit() {
    const auth = JSON.parse(localStorage.getItem('auth'));
    const { user } = auth;
    const recordId = user.id;

    const result = await Swal.fire({
      title: '정말로 탈퇴하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '탈퇴하기',
    });

    if (result.isConfirmed) {
      try {
        await pb.collection('users').delete(recordId);
        localStorage.removeItem('auth');
        Swal.fire('탈퇴가 완료되었습니다.', '', 'success').then(() => {
          location.href = '/';
        });
      } catch (error) {
        Swal.fire('탈퇴에 실패했습니다..');
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
                ?checked=${this.gender === 'male'}
              />
              <label for="gender-male" class="mypage__radio-label">남자</label>
              <input
                type="radio"
                name="gender"
                id="gender-female"
                class="mypage__radio"
                value="female"
                ?checked=${this.gender === 'female'}
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
                ?checked=${this.gender === 'none'}
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
                    value=${this.birth.year}
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
                    value=${this.birth.month}
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
                    value=${this.birth.day}
                  />
                </div>
              </div>
            </div>
          </div>
        </fieldset>

        <div class="mypage__button-wrapper">
          <button
            type="button"
            class="mypage__button mypage__button--quit"
            @click=${this.handleQuit}
          >
            탈퇴하기
          </button>
          <button
            type="submit"
            class="mypage__button mypage__button--update"
            @click=${this.handleUpdate}
          >
            회원정보수정
          </button>
        </div>
      </form>
    `;
  }
}

customElements.define('my-page', MyPage);
