import { LitElement, html, css } from 'lit';
import resetCSS from '/src/styles/reset.css?inline';
import baseCSS from '/src/styles/base.css?inline';

class PopupAd extends LitElement {
  static styles = [
    resetCSS,
    baseCSS,
    css`
      .popup-content {
        width: 27.5rem;
        height: 42rem;
        background-color: var(--white);
        border-radius: 0.625rem;
        overflow: hidden;
        position: relative;
        text-align: center;
        display: flex;
        flex-direction: column;
      }

      .popup-image {
        width: 100%;
        height: calc(100% - 5.375rem);
        background: url('/src/assets/images/popupadimg.jpeg') no-repeat center center/cover;
        filter: blur(0.25rem);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
      }

      .popup-text {
        position: relative;
        width: 100%;
        height: calc(100% - 5.375rem);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
        color: var(--white);
        background: rgba(var(--black), 0.6);
        font-size: 1.333rem;
        line-height: 2.133rem;
        text-align: center;
      }

      .popup-footer {
        width: 100%;
        height: 5.375rem;
        display: flex;
        position: absolute;
        bottom: 0;
        z-index: 3;
        background-color: var(--white);
      }

      .footer-btn {
        flex: 1;
        line-height: 5.375rem;
        text-align: center;
        font-size: 1rem;
        color: var(--content);
        background-color: var(--white);
        cursor: pointer;
        border-top: 0.063rem solid var(--gray--200);
      }

      .footer-btn:not(:last-child) {
        border-right: 0.063rem solid var(--gray--200);
      }

      .footer-btn:hover {
        background-color: var(--gray--50);
      }
    `,
  ];

  constructor() {
    super();
    const today = new Date().toISOString().split('T')[0];
    const popupState = localStorage.getItem('popup-hidden-today');
    this.hidden = popupState === today;
  }

  handleCloseToday() {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('popup-hidden-today', today);
    this.hidePopup();
  }

  handleClosePopUp() {
    this.hidePopup();
  }

  hidePopup() {
    this.hidden = true;
  }

  render() {
    return html`
      <div class="popup" ?hidden=${this.hidden}>
        <div class="popup-content">
          <div class="popup-image"></div>
          <div class="popup-text">
            <p>
              해당 사이트는<br />가시안이며 비상업적 취업을 위한<br />
              포트폴리오 용으로만 사용하기 위해<br />제작된 사이트입니다.
            </p>
          </div>
          <div class="popup-footer">
            <div id="close-today" class="footer-btn" @click=${this.handleCloseToday}>
              오늘 하루 안 보기
            </div>
            <div id="close-popup" class="footer-btn" @click=${this.handleClosePopUp}>닫기</div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('popup-ad', PopupAd);

