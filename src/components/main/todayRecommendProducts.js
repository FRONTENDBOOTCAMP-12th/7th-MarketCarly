import { LitElement, html, css } from 'lit';
import resetCSS from '@/Layout/resetCSS';
import '../ProductCard/ProductCard.js';

export class TodayRecommendProducts extends LitElement {
  constructor() {
    super();
    this.sectionTitle = '이 상품 어때요?';
    this.products = [
      {
        image: '/assets/images/product01.webp',
        title: '[풀무원] 탱탱쫄면 (4개입)',
        price: 4980,
        originalPrice: 4980,
        isDiscounted: false,
        discount: 0,
        badges: [],
      },
      {
        image: '/assets/images/product02.webp',
        delivery: '샛별배송',
        title: '[온더바디] 조르디 시카 자석 선쿠션',
        price: 32500,
        originalPrice: 42000,
        isDiscounted: true,
        discount: 24,
        badges: [
          { type: 'kurly', text: 'Kurly Only' },
          { type: 'limit', text: '한정수량' },
        ],
      },
      {
        image: '/assets/images/product03.webp',
        delivery: '샛별배송',
        title: '유기농 밀키퀸 현미 4kg',
        price: 25000,
        originalPrice: 25000,
        isDiscounted: false,
        discount: 0,
        badges: [],
      },
      {
        image: '/assets/images/product04.webp',
        delivery: '샛별배송',
        title: '[프로쉬] 베이비 세탁세',
        price: 18900,
        originalPrice: 24000,
        isDiscounted: true,
        discount: 24,
        badges: [],
      },
    ];
  }

  static get properties() {
    return {
      sectionTitle: { type: String },
      products: { type: Array },
    };
  }

  static get styles() {
    return [
      resetCSS,
      ,
      css`
        .today__inner {
          padding: 40px 0px;
          color: var(--content, #333);
        }

        .today__list {
          display: flex;
          gap: 1rem;
          list-style: none;
          padding: 0;
          justify-content: center;
        }

        .today__title {
          font-size: 24px;
          font-weight: 500;
          text-align: center;
          margin-bottom: 28px;
          padding: 4px;
        }
      `,
    ];
  }

  render() {
    return html`
      <section class="today">
        <div class="today__inner">
          <header class="today__header">
            <h2 class="today__title">${this.sectionTitle}</h2>
          </header>

          <div class="today__content">
            <ul class="today__list">
              ${this.products.map(
                (product) => html`
                  <li>
                    <product-card
                      .image=${product.image}
                      .delivery=${product.delivery}
                      .title=${product.title}
                      .price=${product.price}
                      .originalPrice=${product.originalPrice}
                      .isDiscounted=${product.isDiscounted}
                      .discount=${product.discount}
                      .badges=${product.badges}
                    ></product-card>
                  </li>
                `
              )}
            </ul>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('today-recommend-products', TodayRecommendProducts);
