// src/components/MainBanner.js
import { LitElement, html, css } from 'lit';
import resetCSS from '../../Layout/resetCSS';

export class MainBanner extends LitElement {
  static get styles() {
    return [
      resetCSS,
      css`
        .main-banner {
          position: relative;
          width: 100%;
        }

        .main-banner__image-container {
          width: 100%;
        }

        .main-banner__image {
          width: 100%;
          height: auto;
          display: block;
        }

        .main-banner__controls {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 0 10%;
          box-sizing: border-box;
        }

        .main-banner__button {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.3s ease;
        }

        .main-banner__button:hover {
          background-color: rgba(128, 128, 128, 0.8);
        }

        .main-banner__counter {
          position: absolute;
          bottom: 20px;
          right: 15%;
          background-color: rgba(128, 128, 128, 0.6);
          color: white;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 14px;
        }
      `,
    ];
  }

  constructor() {
    super();
    this.images = [
      '/assets/images/banner01.webp',
      '/assets/images/banner02.webp',
      '/assets/images/banner03.webp',
      '/assets/images/banner05.webp',
      '/assets/images/banner02.webp',
    ];
    this.currentSlide = 1;
  }

  handlePrevClick() {
    this.currentSlide = this.currentSlide === 1 ? 5 : this.currentSlide - 1;
    this.requestUpdate();
  }

  handleNextClick() {
    this.currentSlide = this.currentSlide === 5 ? 1 : this.currentSlide + 1;
    this.requestUpdate();
  }

  render() {
    return html`
      <section class="main-banner">
        <div class="main-banner__image-container">
          <figure>
            <img
              class="main-banner__image"
              src=${this.images[this.currentSlide - 1]}
              alt="메인 배너 이미지 ${this.currentSlide}"
            />
          </figure>
        </div>

        <nav class="main-banner__controls" aria-label="배너 내비게이션">
          <button
            class="main-banner__button"
            @click=${this.handlePrevClick}
            aria-label="이전 배너"
          >
            <img
              class="main-banner__button-icon"
              src="/assets/icons/PrevArrow.svg"
              alt=""
              aria-hidden="true"
            />
          </button>
          <button
            class="main-banner__button"
            @click=${this.handleNextClick}
            aria-label="다음 배너"
          >
            <img
              class="main-banner__button-icon"
              src="/assets/icons/NextArrow.svg"
              alt=""
              aria-hidden="true"
            />
          </button>
        </nav>

        <div class="main-banner__counter" role="status" aria-live="polite">
          ${this.currentSlide} / ${this.images.length}
        </div>
      </section>
    `;
  }
}

customElements.define('main-banner', MainBanner);
