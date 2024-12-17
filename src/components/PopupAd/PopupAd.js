import {LitElement, html} from 'lit';
import styles from '/src/components/PopupAd/PopupAd.css?inline';
import resetCSS from '/src/styles/reset.css?inline';

class PopupAd extends LitElement {
  handleCloseToday() {
    const popup = this.shadowRoot.querySelector('.popup');
    popup.style.display = 'none';
  }

  handleClosePopUp() {
    const popup = this.shadowRoot.querySelector('.popup');
    popup.style.display = 'none';
  }


    handleClosePopUp(){
        const popup = this.shadowRoot.querySelector('.popup');
        popup.style.display = 'none'; 
    }

    render() {
        return html`
        <style>${styles}, ${resetCSS}</style>
        <div class="popup">
        <div class="popup-content">
          <div class="popup-image"></div>
          <div class="popup-text">
            <p>
              해당 사이트는 가시안이며 비상업적 취업을 위한<br />
              포트폴리오 용으로만 사용하기 위해 제작된 사이트입니다.
            </p>
          </div>
          <div class="popup-footer">
            <div
              id="close-today"
              class="footer-btn"
              @click=${this.handleCloseToday}
            >
              오늘 하루 안 보기
            </div>
            <div
              id="close-popup"
              class="footer-btn"
              @click=${this.handleClosePopUp}
            >
              닫기
            </div>
          </div>
        </div>
      </div>`;
  }
}
customElements.define('popup-ad', PopupAd);
