import { LitElement, html } from 'lit';
import style from '/src/pages/pwConfirm/pwConfirm.css?inline';
import resetCSS from '/src/styles/reset.css?inline';
import pb from '/src/api/pocketbase.js';
import Swal from 'sweetalert2';

class PwConfirm extends LitElement {
  static properties = {
    isPwValid: { type: Boolean },
    userId: { type: String },
  };

  constructor() {
    super();
    this.isPwValid = false;
    this.userId = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.getUserId();
  }

  getUserId() {
    const loginData = JSON.parse(localStorage.getItem('auth') ?? '{}');

    const { user } = loginData;
    this.userId = user ? user.userId : '';
  }

  async fetchData() {
    const pwInput = this.shadowRoot.querySelector('#user-pw');
    const userPw = pwInput.value;
    const idInput = this.shadowRoot.querySelector('#user-id');
    const userId = idInput.value;

    try {
      await pb
        .collection('users')
        .authWithPassword(userId, userPw)
        .then(() => {
          location.href = '/src/pages/mypage/';
        });
    } catch {
      Swal.fire('비밀번호를 확인해주세요.');
    }
  }

  handlePwConfirm(e) {
    e.preventDefault();
    this.fetchData();
  }

  render() {
    return html`
      <style>
        ${resetCSS}
        ${style}
      </style>
      <form action="/" class="pw-confirm" method="">
        <fieldset class="pw-confirm__fieldset">
          <legend class="pw-confirm__legend">개인 정보 수정</legend>
          <p class="pw-confirm__title">비밀번호 재확인</p>
          <p class="pw-confirm__description">
            회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번
            확인해주세요.
          </p>
          <div class="pw-confirm__form">
            <div class="pw-confirm__form-group">
              <div class="pw-confirm__label-wrapper">
                <label for="user-id" class="pw-confirm__label">아이디</label>
              </div>
              <input
                type="text"
                class="pw-confirm__input"
                id="user-id"
                name="user-id"
                value=${this.userId}
              />
            </div>
            <div class="pw-confirm__form-group">
              <div class="pw-confirm__label-wrapper">
                <label
                  for="user-pw"
                  class="pw-confirm__label pw-confirm__label--required"
                  >비밀번호</label
                ><span class="pw-confirm--required" aria-label="필수 입력 요소"
                  >*</span
                >
              </div>
              <input
                type="password"
                class="pw-confirm__input"
                name="user-pw"
                id="user-pw"
                placeholder="현재 비밀번호를 입력해주세요"
                required
                aria-required="true"
              />
            </div>
          </div>
          <button
            type="submit"
            class="pw-confirm__button pw-confirm__button--submit"
            @click=${this.handlePwConfirm}
          >
            확인
          </button>
        </fieldset>
      </form>
    `;
  }
}

customElements.define('pw-confirm', PwConfirm);
