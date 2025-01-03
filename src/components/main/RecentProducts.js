import { LitElement, html, css } from 'lit';
import resetCSS from '@/Layout/resetCSS';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export class RecentProducts extends LitElement {
  static get properties() {
    return {
      products: { type: Array },
      swiper: { type: Object },
    };
  }

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
          transition: transform 0.3s ease;
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
    this.products = JSON.parse(localStorage.getItem('recentProducts')) || [];
  }

  initSwiper() {
    const swiperContainer = this.shadowRoot.querySelector('.recent__content');
    this.swiper = new Swiper(swiperContainer, {
      direction: 'vertical',
      slidesPerView: 2,
      spaceBetween: 10,
      loop: false,
      wrapperClass: 'recent__list',
      slideClass: 'recent__item',
    });
  }

  firstUpdated() {
    this.initSwiper();
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('recentProductsUpdated', () => {
      this.products = JSON.parse(localStorage.getItem('recentProducts')) || [];
      if (this.swiper) {
        this.swiper.destroy();
        this.initSwiper();
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.swiper) {
      this.swiper.destroy();
    }
    window.removeEventListener('recentProductsUpdated');
  }

  initSwiper() {
    const swiperContainer = this.shadowRoot.querySelector('.recent__content');
    this.swiper = new Swiper(swiperContainer, {
      modules: [Navigation],
      direction: 'vertical',
      slidesPerView: 2,
      spaceBetween: 10,
      loop: true,
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      navigation: {
        nextEl: this.shadowRoot.querySelector('[aria-label="다음 상품 보기"]'),
        prevEl: this.shadowRoot.querySelector(
          '[aria-label="최근 본 상품 상단 이동 버튼"]'
        ),
      },
      wrapperClass: 'recent__list',
      slideClass: 'recent__item',
    });
  }

  handleProductClick(product) {
    const currentProducts = JSON.parse(localStorage.getItem('recentProducts'));
    const filterProduct = currentProducts.filter((p) => p.id !== product.id);
    filterProduct.push(product);
    localStorage.setItem('recentProducts', JSON.stringify(filterProduct));
    window.dispatchEvent(new CustomEvent('recentProductsUpdated'));
  }

  render() {
    return html`
      <nav class="recent">
        <button
          class="recent__button"
          aria-label="최근 본 상품 상단 이동 버튼"
          tabindex="0"
        >
          <img
            class="recent__button-icon"
            src="/assets/icons/Direction=Up.svg"
            alt=""
            width="24"
            height="24"
            aria-hidden="true"
          />
        </button>

        <header class="recent__header">
          <h2 class="recent__title">최근 본 상품</h2>
        </header>

        <div class="recent__content">
          <ul class="recent__list" aria-live="polite">
            ${[...this.products].reverse().map(
              (product) => html`
                <li class="recent__item">
                  <a
                    href="/src/pages/productDetail/"
                    class="recent__link"
                    @click=${() => this.handleProductClick(product)}
                    tabindex="0"
                  >
                    <img
                      class="recent__image"
                      src=${product.image}
                      alt=${product.title}
                      tabindex="-1"
                    />
                  </a>
                </li>
              `
            )}
          </ul>
        </div>

        <button class="recent__button" aria-label="다음 상품 보기" tabindex="0">
          <img
            class="recent__button-icon"
            src="/assets/icons/Direction=Down.svg"
            alt=""
            width="24"
            height="24"
            aria-hidden="true"
          />
        </button>
      </nav>
    `;
  }
}

customElements.define('recent-products', RecentProducts);
