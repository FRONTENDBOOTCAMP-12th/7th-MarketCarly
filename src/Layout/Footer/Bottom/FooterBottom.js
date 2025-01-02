import { LitElement, html, css } from 'lit';

class FooterBottomInner extends LitElement {
  static get styles() {
    return css`
      .inner {
        max-width: 1050px;
        margin: 0 auto;
        padding: 20px 4px 32px 4px;
        box-sizing: border-box;
      }

      .text {
        font-size: 10px;
        line-height: 16px;
        color: rgb(153, 153, 153);
        text-align: center;
      }

      .copyright {
        font-size: 10px;
        line-height: 16px;
        color: rgb(153, 153, 153);
        text-align: center;
        padding-top: 8px;
      }
    `;
  }

  render() {
    return html`
      <div class="inner">
        <p class="text">
          마켓컬리에서 판매되는 상품 중에는 마켓컬리에 입점한 개별 판매자가
          판매하는 마켓플레이스 상품이 포함되어 있습니다.
        </p>
        <p class="copyright">© KURLY CORP. ALL RIGHTS RESERVED</p>
      </div>
    `;
  }
}

customElements.define('footer-bottom-inner', FooterBottomInner);

export class FooterBottom extends LitElement {
  static get styles() {
    return css`
      .bottom {
        width: 100%;
        background-color: rgb(247, 247, 247);
        border-top: 1px solid rgb(238, 238, 238);
      }
    `;
  }

  render() {
    return html`
      <div class="bottom">
        <footer-bottom-inner></footer-bottom-inner>
      </div>
    `;
  }
}

customElements.define('footer-bottom', FooterBottom);
