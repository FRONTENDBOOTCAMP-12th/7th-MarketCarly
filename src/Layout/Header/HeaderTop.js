import { LitElement, html, css } from 'lit';
import resetCSS from '../resetCSS.ts';
import baseCSS from '../base.ts';
import './SearchBar.js';
import Swal from 'sweetalert2';

export class HeaderTop extends LitElement {
  static get styles() {
    return [
      baseCSS,
      resetCSS,
      css`
        .top {
          width: 100%;
        }

        .top__inner {
          max-width: 65.625rem;
          margin: 0 auto;
        }

        .top__login {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 1rem;
        }

        .top__list {
          display: flex;
          list-style: none;
          gap: 0.75rem;
          align-items: center;
        }

        .top__item {
          position: relative;
          font-size: var(--text-xs);
        }

        .top__item:not(:last-child)::after {
          content: '';
          position: absolute;
          right: -0.5rem;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 0.75rem;
          background-color: var(--gray--200);
        }

        .top__link {
          color: var(--gray--600);
          text-decoration: none;
        }

        .top__link:hover {
          color: var(--primary);
        }

        .top__search {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          max-width: 1050px;
          margin: 0 auto;
          gap: 1rem;
        }

        .top__logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logo__image {
          width: 82px;
          height: 42px;
        }

        .logo__links {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .logo__link {
          font-size: var(--text-lg);
          font-weight: var(--font-bold);
          color: #c4c4c4;
          display: flex;
          align-items: center;
        }

        .logo__link--active {
          color: var(--primary);
        }

        .logo__divide {
          width: 1px;
          height: 14px;
          background-color: #c4c4c4;
        }

        .logo__badge {
          position: relative;
          width: 7px;
          height: 7px;
          top: -5px;
          right: -5px;
        }

        .top__icons,
        .top__icons-list {
          display: flex;
          gap: 1.25rem;
          align-items: center;
        }

        .top__icons-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .top__icons-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
        }

        .top__login-auth {
          display: flex;
          align-items: center;
        }

        .top__button-logout {
          border: 0;
          background-color: transparent;
          font-size: 0.75rem;
          display: flex;
          padding-left: 0.625rem;
          padding-right: 0;
        }

        @media (max-width: 900px) {
          .search__form {
            gap: none;
          }
        }

        @media (max-width: 850px) {
          .logo__links {
            width: 200px;
          }

          .top__icons-list {
            width: 150px;
          }
        }
      `,
    ];
  }

  static properties = {
    isAuth: { type: Boolean },
    userName: { type: String },
  };

  constructor() {
    super();
    this.isAuth = false;
    this.userName = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.getAuth();
  }

  getAuth() {
    const auth = JSON.parse(localStorage.getItem('auth')) || '';
    this.isAuth = auth.isAuth;

    const { user } = auth;
    if (user) {
      this.userName = user.name;
    }
  }

  handleLogout() {
    Swal.fire({
      title: '로그아웃 하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '로그아웃',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('auth');
        location.href = '/';
      }
    });
  }

  handleLoginDirect() {
    Swal.fire({
      title: '로그인 후 이용 가능합니다.',
      text: '로그인 페이지로 이동합니다.',
    }).then(() => {
      location.href = '/src/pages/login/';
    });
  }

  render() {
    return html`
      <div role="banner">
        <div class="top__inner">
          <nav class="top__login" aria-label="사용자 메뉴">
            <ul class="top__list" role="list">
              <li class="top__item">
                <a href="/src/pages/register/" class="top__link">회원가입</a>
              </li>
              <li class="top__item">
                ${this.isAuth
                  ? html`<div class="top__login-auth">
                      <span class="top__login-name">${this.userName}님</span>
                      <button
                        type="button"
                        class="top__button-logout"
                        @click=${this.handleLogout}
                      >
                        Logout
                      </button>
                    </div>`
                  : html`<a href="/src/pages/login/" class="top__link"
                      >로그인</a
                    >`}
              </li>
              <li class="top__item">
                <a href="/cs" class="top__link">고객센터</a>
              </li>
            </ul>
          </nav>

          <div class="top__search">
            <h1 class="top__logo">
              <a href="/" class="logo__link" aria-label="메인페이지로 이동">
                <img
                  src="/assets/icons/logo.svg"
                  alt="마켓칼리"
                  class="logo__image"
                />
              </a>
              <nav class="logo__links" aria-label="마켓 선택">
                <a href="/market" class="logo__link logo__link--active"
                  >마켓칼리</a
                >
                <span class="logo__divide" aria-hidden="true"></span>
                <a href="/beauty" class="logo__link">
                  뷰티칼리
                  <img
                    src="/assets/icons/new1.svg"
                    alt="New"
                    class="logo__badge"
                  />
                </a>
              </nav>
            </h1>

            <search-bar></search-bar>

            <nav class="top__icons" aria-label="사용자 도구">
              <ul class="top__icons-list" role="list">
                <li>
                  <button
                    class="top__icons-button"
                    @click=${this.isAuth
                      ? () => (location.href = '/src/pages/pwConfirm/')
                      : this.handleLoginDirect}
                    aria-label="개인정보 수정"
                  >
                    <img
                      src="/assets/icons/edit.svg"
                      alt=""
                      aria-hidden="true"
                    />
                  </button>
                </li>
                <li>
                  <button class="top__icons-button" aria-label="찜하기">
                    <img
                      src="/assets/icons/Heart.svg"
                      alt=""
                      aria-hidden="true"
                    />
                  </button>
                </li>
                <li>
                  <button
                    class="top__icons-button"
                    aria-label="장바구니"
                    @click=${() => (window.location.href = '/src/pages/cart/')}
                  >
                    <img
                      src="/assets/icons/Cart2.svg"
                      alt=""
                      aria-hidden="true"
                    />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('header-top', HeaderTop);
