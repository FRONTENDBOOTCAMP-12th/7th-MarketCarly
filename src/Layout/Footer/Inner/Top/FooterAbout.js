import { LitElement, html, css } from 'lit';

export class FooterAbout extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        width: 410px;
      }

      .about {
        display: flex;
        flex-direction: column;
        gap: 28px;
      }

      .navigation {
        display: flex;
        gap: 8px;
      }

      .navigation__link {
        font-size: 14px;
        color: rgb(76, 76, 76);
        text-decoration: none;
      }

      .area {
        margin-top: 16px;
        display: flex;
        flex-direction: column;
      }

      .area__text {
        font-size: 12px;
        color: rgb(76, 76, 76);
        line-height: 18px;
      }

      .area {
        display: flex;
        flex-direction: column;
      }

      .paragraph {
        display: flex;
        align-items: center;
        color: #333333;
        font-size: 12px;
        line-height: 18px;
      }

      .divider {
        width: 1px;
        height: 12px;
        background-color: #d9d9d9;
        margin: 0 4px;
      }

      .text a {
        color: #5f0080;
        text-decoration: none;
      }

      .text a:hover {
        text-decoration: underline;
      }

      .sns {
        display: flex;
        gap: 20px;
        margin-top: 16px;
      }

      .sns__link {
        width: 30px;
        height: 30px;
      }

      .sns__icon {
        width: 100%;
        height: 100%;
      }
    `;
  }

  render() {
    return html`
      <div class="about">
        <div class="navigation">
          <a href="#" class="navigation__link">칼리소개</a>
          <a href="#" class="navigation__link">칼리소개영상</a>
          <a href="#" class="navigation__link">인재채용</a>
          <a href="#" class="navigation__link">이용약관</a>
          <a href="#" class="navigation__link">개인정보처리방침</a>
          <a href="#" class="navigation__link">이용안내</a>
        </div>

        <div class="area">
          <div class="paragraph">
            <span class="text">법인명 (상호) : 주식회사 컬리</span>
            <div class="divider"></div>
            <span class="text">사업자등록번호 : 111-11-22222</span>
          </div>

          <div class="paragraph">
            <span class="text">통신판매업 : 제 2005-서울강남-00000 호</span>
            <div class="divider"></div>
            <span class="text">개인정보보호책임자 : 홍길동</span>
          </div>

          <div class="paragraph">
            <span class="text"
              >주소 : 서울특별시 강남구 테헤란로 5003, 28층(역삼동)</span
            >
            <div class="divider"></div>
            <span class="text">대표이사 : 김도연</span>
          </div>

          <div class="paragraph">
            <span class="text"
              >입점문의 :
              <a href="mailto:business@kurlycorp.com">business@kurlycorp.com</a>
            </span>
            <div class="divider"></div>
            <span class="text"
              >채용문의 :
              <a href="mailto:recruit@kurlycorp.com">recruit@kurlycorp.com</a>
            </span>
          </div>

          <div class="paragraph">
            <span class="text">팩스 : 070 - 1111 - 2222</span>
          </div>
        </div>

        <div class="sns">
          <a href="#" class="sns__link">
            <img src="/assets/icons/nblog.png" alt="블로그" class="sns__icon" />
          </a>
          <a href="#" class="sns__link">
            <img
              src="/assets/icons/facebook.png"
              alt="페이스북"
              class="sns__icon"
            />
          </a>
          <a href="#" class="sns__link">
            <img
              src="/assets/icons/instagram.png"
              alt="인스타그램"
              class="sns__icon"
            />
          </a>
          <a href="#" class="sns__link">
            <img
              src="/assets/icons/npost.png"
              alt="네이버포스트"
              class="sns__icon"
            />
          </a>
        </div>
      </div>
    `;
  }
}

customElements.define('footer-about', FooterAbout);
