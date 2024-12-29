import { LitElement, html, css } from 'lit';
import resetCSS from '@/Layout/resetCSS';
import baseCSS from '@/Layout/base';
import '@/components/ProductCard/ProductBadge.js';

export class ProductCard extends LitElement {
  constructor() {
    super();
    this.image = '/assets/images/product1.jpg';
    this.delivery = '샛별배송';
    this.title = '[풀무원] 탱탱쫄면';
    this.price = 4980;
    this.originalPrice = 6000;
    this.isDiscounted = true;
    this.discount = 24;
    this.description = '튀기지 않아 부담없는 매콤함';
    this.badges = [
      { type: 'kurly', text: 'Kurly Only' },
      { type: 'limit', text: '한정수량' },
    ];
  }

  static get properties() {
    return {
      image: { type: String },
      delivery: { type: String },
      title: { type: String },
      brand: { type: String },
      description: { type: String },
      price: { type: Number },
      originalPrice: { type: Number },
      isDiscounted: { type: Boolean },
      discount_rate: { type: Number },
      badges: { type: Array },
    };
  }

  static get styles() {
    return [
      resetCSS,
      baseCSS,
      css`
        .product {
          position: relative;
          width: 100%;
        }

        .product__link {
          display: block;
          text-decoration: none;
          color: inherit;
        }

        .product__image-wrap {
          position: relative;
          width: 250px;
          aspect-ratio: 1 / 1.25;
          background: var(--gray--50);
        }

        .product__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product__discount {
          position: absolute;
          top: 0;
          left: 0;
          padding: 0.25rem 0.5rem;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          font-weight: var(--font-medium);
        }

        .product__cart {
          position: absolute;
          bottom: 0.9375rem;
          right: 0.9375rem;
          width: 2.8125rem;
          height: 2.8125rem;
          border: none;
          background: none;
          cursor: pointer;
          padding: 0;
        }

        .product__info {
          padding: 0.75rem 0;
          white-space: normal;
          word-wrap: break-word;
          width: 250px;
        }

        .product__delivery {
          display: block;
          font-size: var(--text-xs);
          font-weight: var(--font-semibold);
          color: var(--gray--400);
          margin-bottom: 0.5rem;
        }

        .product__title {
          font-size: var(--text-base);
          font-weight: var(--font-regular);
          color: var(--content);
          margin-bottom: 0.5rem;
        }

        .product__price-wrap {
          display: block;
          margin-bottom: 0.5rem;
        }

        .product__price-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 21.328px;
          font-weight: 600;
          line-height: 150%;
        }

        .product__discount-rate {
          color: var(--accent-yellow, #fa622f);
          font-weight: var(--font-semibold);
        }

        .product__price {
          font-weight: var(--font-semibold);
        }

        .product__price--original {
          display: block;
          margin-top: 0.25rem;
          color: var(--gray--400);
          text-decoration: line-through;
          font-size: var(--text-xs);
        }

        .product__description {
          font-size: var(--text-xs);
          color: var(--gray--400);
          word-wrap: break-word;
          width: 100%;
          overflow-wrap: break-word;
        }

        .product__badges {
          display: flex;
          gap: 0.25rem;
          margin-top: 0.5rem;
          list-style: none;
        }
      `,
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('badges:', this.badges);
  }

  render() {
    console.log('render badges:', this.badges);
    const formattedTitle = this.brand
      ? `[${this.brand}] ${this.title}`
      : this.title;

    return html`
      <article class="product">
        <a href="src/pages/productDetail/" class="product__link">
          <div class="product__image-wrap">
            <img
              class="product__image"
              src="${this.image}"
              alt="${formattedTitle}"
            />
            <button class="product__cart" aria-label="장바구니 담기">
              <img src="/assets/icons/Cart.svg" alt="" aria-hidden="true" />
            </button>
          </div>

          <div class="product__info">
            ${this.delivery
              ? html`<p class="product__delivery">${this.delivery}</p>`
              : ''}
            <h3 class="product__title">${formattedTitle}</h3>
            <div class="product__price-wrap">
              ${this.isDiscounted && this.discount_rate
                ? html`
                    <div class="product__price-info">
                      <strong class="product__discount-rate"
                        >${this.discount_rate}%</strong
                      >
                      <strong class="product__price"
                        >${this.price?.toLocaleString() ?? 0}원</strong
                      >
                    </div>
                    <del class="product__price--original">
                      ${this.originalPrice?.toLocaleString() ?? 0}원
                    </del>
                  `
                : html`
                    <div class="product__price-info">
                      <strong class="product__price"
                        >${this.price?.toLocaleString() ?? 0}원</strong
                      >
                    </div>
                  `}
            </div>
            ${this.description
              ? html`<p class="product__description">${this.description}</p>`
              : ''}
            ${this.badges?.badges?.length
              ? html`
                  <ul class="product__badges">
                    ${this.badges.badges
                      .filter((badge) => badge.type && badge.text)
                      .map(
                        (badge) => html`
                          <li>
                            <product-badge
                              type=${badge.type}
                              text=${badge.text}
                            ></product-badge>
                          </li>
                        `
                      )}
                  </ul>
                `
              : ''}
          </div>
        </a>
      </article>
    `;
  }
}

customElements.define('product-card', ProductCard);
