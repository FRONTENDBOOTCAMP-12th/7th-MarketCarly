// src/components/main/RecentProducts.js
import { LitElement, html, css } from 'lit';
import resetCSS from '@/Layout/resetCSS';

export class RecentProducts extends LitElement {
  static get styles() {
    return [
      resetCSS,
      css`
        :host {
          display: block;
          width: 100%;
        }

        .recent {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 5rem;
          max-width: 7rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          overflow: hidden;
          background-color: #ffffff;
        }

        .recent__button {
          background-color: transparent;
          border: none;
          padding: 0.5rem;
          cursor: pointer;
        }

        .recent__button-icon {
          display: block;
          width: 24px;
          height: 24px;
        }

        .recent__header {
          margin: 0.5rem 0;
          text-align: center;
        }

        .recent__title {
          font-size: 1rem;
          font-weight: bold;
        }

        .recent__content {
          width: 100%;
          height: 11rem;
          padding: 0 0.5rem;
          display: flex;
          justify-content: center;
          overflow: hidden;
        }

        .recent__list {
          list-style: none;
          width: 50%;
          align-items: center;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .recent__item {
          width: 100%;
          aspect-ratio: 1 / 1;
          flex-shrink: 0;
          flex-grow: 0;
        }

        .recent__link {
          display: block;
          width: 100%;
          height: 100%;
          background-color: #f8f8f8;
          border-radius: 4px;
          overflow: hidden;
        }

        .recent__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      `,
    ];
  }

  constructor() {
    super();
    this.products = [
      { src: '/assets/images/banner01.webp', alt: '상품 1', href: '#' },
      { src: '/assets/images/banner02.webp', alt: '상품 2', href: '#' },
      { src: '/assets/images/banner03.webp', alt: '상품 3', href: '#' },
      { src: '/assets/images/banner05.webp', alt: '상품 4', href: '#' },
    ];
  }

  render() {
    return html`
      <aside class="recent">
        <button class="recent__button" aria-label="이전 상품 보기">
          <img
            class="recent__button-icon"
            src="/assets/icons/Direction=Up.svg"
            alt=""
            aria-hidden="true"
          />
        </button>

        <header class="recent__header">
          <h2 class="recent__title">최근 본 상품</h2>
        </header>

        <div class="recent__content">
          <ul class="recent__list">
            ${this.products.map(
              (product) => html`
                <li class="recent__item">
                  <a href=${product.href} class="recent__link">
                    <img
                      class="recent__image"
                      src=${product.src}
                      alt=${product.alt}
                    />
                  </a>
                </li>
              `
            )}
          </ul>
        </div>

        <button class="recent__button" aria-label="다음 상품 보기">
          <img
            class="recent__button-icon"
            src="/assets/icons/Direction=Down.svg"
            alt=""
            aria-hidden="true"
          />
        </button>
      </aside>
    `;
  }
}

customElements.define('recent-products', RecentProducts);
