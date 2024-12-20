import { LitElement, html, css } from 'lit';
import style from '/src/pages/login/login.css?inline';
import resetCSS from '/src/styles/reset.css?inline';

class Login extends LitElement {
  render() {
    return html`
      <style>
        ${resetCSS}
        ${style}
      </style>
      <form action="/" class="login" method="">
        <fieldset class="login__fieldset">
          <legend class="login__legend">로그인</legend>
          <div class="login__form">
            <div class="login__form-group">
              <label for="user-id" class="login__label login__label--required"
                >아이디</label
              >
              <input
                type="text"
                class="login__input"
                id="user-id"
                name="user-id"
                placeholder="아이디를 입력해주세요"
                required
                aria-required="true"
              />
            </div>
            <div class="login__form-group">
              <label for="user-pw" class="login__label login__label--required"
                >비밀번호</label
              >
              <input
                type="password"
                class="login__input"
                name="user-pw"
                id="user-pw"
                placeholder="비밀번호를 입력해주세요"
                required
                aria-required="true"
              />
            </div>
            <div class="find-wrapper">
              <a
                href="/src/pages/login/"
                class="login__find-button login__find-button--id"
                >아이디 찾기</a
              >
              <a
                href="/src/pages/login/"
                class="login__find-button login__find-button--pw"
              >
                비밀번호 찾기
              </a>
            </div>
            <button type="submit" class="login__button login__button--submit">
              로그인
            </button>
            <a
              href="/src/pages/register/"
              class="login__button login__button--register"
              >회원가입</a
            >
          </div>
        </fieldset>
      </form>
    `;
  }
}

customElements.define('login-form', Login);
